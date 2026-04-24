package com.efiling.controller;

import java.util.Date;
import java.util.List;

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
import com.efiling.entity.CourtMaster;
import com.efiling.entity.CourtUserMapping;
import com.efiling.entity.LoginLog;
import com.efiling.entity.Lookup;
import com.efiling.entity.ObjectMaster;
import com.efiling.entity.RefreshToken;
import com.efiling.entity.User;
import com.efiling.entity.UserRole;
import com.efiling.repository.LoginLogRepository;
import com.efiling.repository.UserRepository;
import com.efiling.response.ApiResponse;
import com.efiling.service.CourtMasterService;
import com.efiling.service.CourtUserMappingService;
import com.efiling.service.JwtService;
import com.efiling.service.LookupService;
import com.efiling.service.ObjectMasterService;
import com.efiling.service.RefreshTokenService;
import com.efiling.service.UserRoleService;
import com.efiling.service.UserService;

@RestController
@RequestMapping("/auth")
public class LoginController {

	private static final Logger log = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private CourtUserMappingService courtUserMappingService;

	@Autowired
	private CourtMasterService courtMasterService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private LookupService lookupService;

	@Autowired
	private UserRoleService urService;

	@Autowired
	private RefreshTokenService refreshTokenService;

	@Autowired
	private UserService userService;

	@Autowired
	private LoginLogRepository loginLogRepo;

	@Autowired
	private ObjectMasterService objectMasterService;

	@Autowired
	private JwtService jwtService;

	// ============================= LOGIN MEHTOD =============================
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest req, HttpServletRequest request) {

		log.info("Login attempt for username={}", req.getUsername());

		//  1. Get user
		User user = userService.getByUsername(req.getUsername());

		if (user == null || user.getUm_rec_status() != 1) {
			return ResponseEntity.status(401).body(new ApiResponse<>(false, "Invalid username or inactive user"));
		}

		//  2. Password check
		if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
			return ResponseEntity.status(401).body(new ApiResponse<>(false, "Invalid username or password"));
		}

		//  3. Login Log
		LoginLog loginLog = new LoginLog();
		loginLog.setLl_login_time(new Date());
		loginLog.setLl_user_mid(user.getUm_id());
		loginLog.setLl_ip_address(request.getRemoteAddr());
		loginLogRepo.save(loginLog);

		//  4. Reload user (with roles)
		user = userService.getById(user.getUm_id());

		//  5. Get role
		String role = user.getUserroles().get(0).getLk().getLkLongname();

		//  6. Load menu (ObjectMaster)
		List<ObjectMaster> obList = objectMasterService.getUserObjects(user.getUm_id());

		//  7. Court Mapping (ECOURT)
		CourtMaster courtMaster = null;

		if ("ECOURT".equals(role)) {
			CourtUserMapping mapping = courtUserMappingService.getByUserCourtMapping(user.getUm_id());
					

			if (mapping != null) {
				courtMaster = courtMasterService.getByCourtMasterById(mapping.getCum_court_mid());
				user.setCourtMaster(courtMaster);
			}
		}

		//  8. Decide dashboard (instead of JSP redirect)
		String dashboard = getDashboardByRole(role, courtMaster);

		// 9. Generate JWT
		String accessToken = jwtService.generateAccessToken(user.getUsername());
		String refreshToken = jwtService.generateRefreshToken(user.getUsername());

		refreshTokenService.createRefreshToken(user.getUsername(), refreshToken);

		log.info("Login successful for username={}", user.getUsername());

		//  10. Response DTO
		LoginResponse data = new LoginResponse(accessToken, refreshToken, user.getUsername(), role, dashboard, obList);

		return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", data));
	}

	
	
	private String getDashboardByRole(String role, CourtMaster cm) {

	    switch (role) {

	        case "DMSAdmin":
	            return "admin/home";

	        case "Review_Officer":
	        case "Deputy Registrar(Decree)":
	        case "DECREE EXAMINER":
	        case "SECTION_OFFICER":
	        case "DECREE CREATOR":
	        case "Assistant Review Officer":
	        case "Stamp_Reporter":
	        case "REGISTRAR":
	        case "REGISTRAR (J)":
	        case "JOINT REGISTRAR":
	        case "JOINT REGISTRAR (J)":
	            return "user/home";

	        case "Chief Justice":
	            return "nomination/nominated";

	        case "Judge":
	            return "casefile/manage";

	        case "ECOURT":
	            if (cm != null && cm.getSubBenches() != null) {
	                return "ecourt/ecourtHome";
	            }
	            return "ecourt/home";

	        case "CaueList_Uploader":
	            return "causelist/home";

	        case "Private_Secretary":
	        case "Bench Secretary":
	            return "ecourt/home";

	        case "Download Copy":
	            return "casefile/download_manage";

	        case "Stemp Reporter":
	            return "casefile/case_stempreport";

	        default:
	            return "user/home";
	    }
	}
	
	
	
	
	// ================= LOGIN =================
	/*
	 * @PostMapping("/login") public ResponseEntity<ApiResponse<?>>
	 * login(@Valid @RequestBody LoginRequest req,HttpServletRequest request) {
	 * 
	 * log.info("Login attempt for username={}", req.getUsername());
	 * 
	 * User user = userService.getByUsername(req.getUsername());
	 * 
	 * if (user == null) { log.warn("Login failed: user not found username={}",
	 * req.getUsername()); return ResponseEntity.status(401) .body(new
	 * ApiResponse<>(false, "Invalid username or password")); }
	 * 
	 * if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
	 * log.warn("Login failed: invalid password for username={}",
	 * req.getUsername()); return ResponseEntity.status(401) .body(new
	 * ApiResponse<>(false, "Invalid username or password")); }
	 * 
	 * 
	 * CourtMaster cm1=null;
	 * 
	 * if(user.getUserroles().get(0).getLk().getLkLongname().equals("DECREE CREATOR"
	 * ) ||
	 * user.getUserroles().get(0).getLk().getLkLongname().equals("DECREE EXAMINER")
	 * || user.getUserroles().get(0).getLk().getLkLongname().
	 * equals("Deputy Registrar(Decree)") ) {
	 * 
	 * if (user.getUm_id() != null && user.getUm_rec_status()==1) {
	 * 
	 * Date date1=new Date();
	 * 
	 * String ipaddress = request.getRemoteAddr();
	 * 
	 * //String date = cm.dateToString(date1,"dd-MM-yyyy"); LoginLog loginLog=new
	 * LoginLog();
	 * 
	 * loginLog.setLl_login_time(date1); loginLog.setLl_user_mid(user.getUm_id());
	 * loginLog.setLl_ip_address(ipaddress);
	 * 
	 * loginLogRepo.save(loginLog);
	 * 
	 * user = userService.getById(user.getUm_id());
	 * 
	 * List<ObjectMaster> ob_list =
	 * objectMasterService.getUserObjects(user.getUm_id());
	 * 
	 * if(user.getUserroles().get(0).getLk().getLkLongname().equals("ECOURT")) {
	 * CourtUserMapping cum
	 * =courtUserMappingService.getByUserCourtMapping(user.getUm_id()); //
	 * session.setAttribute("USER", user); if(cum != null) { CourtMaster cm
	 * =courtMasterService.getByCourtMasterById(cum.getCum_court_mid()); cm1=cm;
	 * String after = before.trim().replaceAll(" +", " "); if(cm != null) {
	 * user.setUm_fullname(cm.getCm_judges_name().trim().replaceAll(" +", " "));
	 * 
	 * user.setCourtMaster(cm);
	 * 
	 * 
	 * System.out.println("USer Info "+user);
	 * 
	 * } } }
	 * 
	 * 
	 * 
	 * 
	 * }
	 * 
	 * 
	 * }
	 * 
	 * 
	 * 
	 * 
	 * String accessToken = jwtService.generateAccessToken(user.getUsername());
	 * String refreshToken = jwtService.generateRefreshToken(user.getUsername());
	 * 
	 * refreshTokenService.createRefreshToken(user.getUsername(), refreshToken);
	 * 
	 * log.info("Login successful for username={}", user.getUsername());
	 * 
	 * LoginResponse data = new LoginResponse( accessToken, refreshToken,
	 * user.getUsername(), 900L );
	 * 
	 * return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", data));
	 * }
	 */

	// ================= REGISTER =================
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest req,
			HttpServletRequest request) {

		log.info("Register request for username={}", req.getUsername());

		if (!req.getPassword().equals(req.getConfirmPassword())) {
			log.warn("Password mismatch for username={}", req.getUsername());
			return ResponseEntity.badRequest()
					.body(new ApiResponse<>(false, "Password and Confirm Password must match"));
		}

		if (userRepo.existsByUsername(req.getUsername())) {
			log.warn("Registration failed: username already exists={}", req.getUsername());
			return ResponseEntity.status(409).body(new ApiResponse<>(false, "Username already exists"));
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

		if (user.getUm_id() != null) {

			if ("AOR".equalsIgnoreCase(req.getType())) {
				role = "Advocate";
			} else {
				role = "In-person";
			}

			Lookup lkRole = lookupService.findByLongName(role);

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

		return ResponseEntity.ok(new ApiResponse<>(true, "User registered successfully"));
	}

	// ================= REFRESH TOKEN =================
	@PostMapping("/refresh")
	public ResponseEntity<ApiResponse<?>> refresh(@RequestParam String refreshToken) {

	    log.info("Refresh token request");

	    try {
	        //  1. Validate refresh token
	        RefreshToken rt = refreshTokenService.verifyToken(refreshToken);

	        String username = rt.getUsername();

	        //  2. Load user
	        User user = userService.getByUsername(username);

	        if (user.getUm_rec_status() != 1) {
	            return ResponseEntity.status(401)
	                    .body(new ApiResponse<>(false, "User is inactive"));
	        }

	        //  3. Get role
	        String role = user.getUserroles().get(0).getLk().getLkLongname();

	        //  4. Load menu
	        List<ObjectMaster> obList = objectMasterService.getUserObjects(user.getUm_id());

	        //  5. Court mapping (ECOURT)
	        CourtMaster courtMaster = null;

	        if ("ECOURT".equals(role)) {
	            CourtUserMapping mapping = courtUserMappingService.getByUserCourtMapping(user.getUm_id());
	                  

	            if (mapping != null) {
	                courtMaster = courtMasterService.getByCourtMasterById(mapping.getCum_court_mid());
	                user.setCourtMaster(courtMaster);
	            }
	        }

	        //  6. Dashboard
	        String dashboard = getDashboardByRole(role, courtMaster);

	        //  7. Generate NEW access token
	        String newAccessToken = jwtService.generateAccessToken(username);

	        //  OPTIONAL (BEST PRACTICE): rotate refresh token
	        // String newRefreshToken = jwtService.generateRefreshToken(username);
	        // refreshTokenService.updateToken(rt, newRefreshToken);

	        log.info("Token refreshed for username={}", username);

	        //  8. Response (same as login)
	        LoginResponse data = new LoginResponse(
	                newAccessToken,
	                refreshToken,   // or newRefreshToken if rotating
	                username,
	                role,
	                dashboard,
	                obList
	        );

	        return ResponseEntity.ok(new ApiResponse<>(true, "Token refreshed", data));

	    } catch (RuntimeException e) {
	        log.warn("Refresh token invalid: {}", e.getMessage());
	        return ResponseEntity.status(401)
	                .body(new ApiResponse<>(false, "Invalid or expired refresh token"));

	    } catch (Exception e) {
	        log.error("Unexpected error in refresh: {}", e.getMessage());
	        return ResponseEntity.status(500)
	                .body(new ApiResponse<>(false, "Internal server error"));
	    }
	}

	// ================= LOGOUT =================
	@PostMapping("/logout")
	public ResponseEntity<ApiResponse<?>> logout(@RequestParam String refreshToken) {

		log.info("Logout request");

		refreshTokenService.deleteByToken(refreshToken);

		log.info("Logout successful");

		return ResponseEntity.ok(new ApiResponse<>(true, "Logged out successfully"));
	}

	// ================= LOGOUT ALL =================
	@PostMapping("/logoutAll")
	public ResponseEntity<ApiResponse<?>> logoutAll(@RequestParam String username) {

		log.info("Logout all devices for username={}", username);

		refreshTokenService.deleteByUsername(username);

		log.info("All sessions cleared for username={}", username);

		return ResponseEntity.ok(new ApiResponse<>(true, "Logged out from all devices"));
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