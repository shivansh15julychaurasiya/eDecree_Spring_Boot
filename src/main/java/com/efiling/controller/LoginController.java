package com.efiling.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.efiling.dto.LoginRequest;
import com.efiling.dto.LoginResponse;
import com.efiling.dto.RegisterRequest;
import com.efiling.entity.Lookup;
import com.efiling.entity.RefreshToken;
import com.efiling.entity.User;
import com.efiling.entity.UserRole;
import com.efiling.repository.UserRepository;
import com.efiling.response.ApiResponse;
import com.efiling.service.JwtService;
import com.efiling.service.LookupService;
import com.efiling.service.RefreshTokenService;
import com.efiling.service.UserRoleService;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private LookupService lookupService;
    
    @Autowired
    private UserRoleService urService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtService jwtService;

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest req) {

        log.info("Login attempt for username={}", req.getUsername());

        User user = userRepo.findByUsername(req.getUsername());

        if (user == null) {
            log.warn("Login failed: user not found username={}", req.getUsername());
            return ResponseEntity.status(401)
                    .body(new ApiResponse<>(false, "Invalid username or password"));
        }

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            log.warn("Login failed: invalid password for username={}", req.getUsername());
            return ResponseEntity.status(401)
                    .body(new ApiResponse<>(false, "Invalid username or password"));
        }

        String accessToken = jwtService.generateAccessToken(user.getUsername());
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        refreshTokenService.createRefreshToken(user.getUsername(), refreshToken);

        log.info("Login successful for username={}", user.getUsername());

        LoginResponse data = new LoginResponse(
                accessToken,
                refreshToken,
                user.getUsername(),
                900L
        );

        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", data));
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest req,HttpServletRequest request) {

        log.info("Register request for username={}", req.getUsername());

        if (!req.getPassword().equals(req.getConfirmPassword())) {
            log.warn("Password mismatch for username={}", req.getUsername());
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Password and Confirm Password must match"));
        }

        if (userRepo.existsByUsername(req.getUsername())) {
            log.warn("Registration failed: username already exists={}", req.getUsername());
            return ResponseEntity.status(409)
                    .body(new ApiResponse<>(false, "Username already exists"));
        }
        String role = null;

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setUm_fullname(req.getName());
        user.setUm_email(req.getEmail());
        user.setUm_mobile(req.getMobile());
        user.setUm_gender(req.getGender());
        user.setCr_date(new Date());

        if (req.getType().equals("aor")) {
			user.setUm_rec_status(1);
		}
        String ipaddress = request.getRemoteAddr();
		user.setUm_ipaddress(ipaddress);
		User savedUser = userRepo.save(user);

		log.info("User saved with id={}", savedUser.getUm_id());
        
		
		if(user.getUm_id()!=null) {
			
           if ("AOR".equalsIgnoreCase(req.getType())) {
            role="Advocate";
           } else {
        	 role="In-person";
           }
           
          Lookup lkRole= lookupService.findByLongName(role);
          
          UserRole ur = new UserRole();
          
          ur.setUr_um_mid(user.getUm_id());
			ur.setUr_role_id(lkRole.getLkId());
			ur.setUr_cr_date(new Date());
			ur.setUr_rec_status(1);

			urService.saveRole(ur);
			 log.info("UserRole assigned: username={}, role={}", user.getUsername(), role);
			
          
           
		}
         userRepo.save(user);

        log.info("User registered successfully username={}", user.getUsername());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "User registered successfully")
        );
    }

    // ================= REFRESH TOKEN =================
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<?>> refresh(@RequestParam String refreshToken) {

        log.info("Refresh token request");

        try {
            RefreshToken rt = refreshTokenService.verifyToken(refreshToken);

            String username = rt.getUsername();
            String newAccessToken = jwtService.generateAccessToken(username);

            log.info("Token refreshed for username={}", username);

            LoginResponse data = new LoginResponse(
                    newAccessToken,
                    refreshToken,
                    username,
                    900L
            );

            return ResponseEntity.ok(new ApiResponse<>(true, "Token refreshed", data));

        } catch (Exception e) {
            log.error("Refresh token failed: {}", e.getMessage());
            return ResponseEntity.status(401)
                    .body(new ApiResponse<>(false, e.getMessage()));
        }
    }

    // ================= LOGOUT =================
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout(@RequestParam String refreshToken) {

        log.info("Logout request");

        refreshTokenService.deleteByToken(refreshToken);

        log.info("Logout successful");

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Logged out successfully")
        );
    }

    // ================= LOGOUT ALL =================
    @PostMapping("/logoutAll")
    public ResponseEntity<ApiResponse<?>> logoutAll(@RequestParam String username) {

        log.info("Logout all devices for username={}", username);

        refreshTokenService.deleteByUsername(username);

        log.info("All sessions cleared for username={}", username);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Logged out from all devices")
        );
    }

    // ================= HEALTH =================
    @GetMapping("/check")
    public String check() {
        log.debug("Health check endpoint called");
        return "OK";
    }

    @GetMapping("/hello")
    public String hello() {
        log.debug("Hello endpoint called");
        return "HELLO WORKING";
    }
}