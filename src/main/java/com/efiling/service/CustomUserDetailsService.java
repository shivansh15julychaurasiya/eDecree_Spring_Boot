package com.efiling.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.efiling.entity.User;
import com.efiling.entity.UserRole;
import com.efiling.repository.UserRepository;
import com.efiling.repository.UserRoleRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleRepository urRepo;

    @Override
    public UserDetails loadUserByUsername(String username) {

        User user = userService.getByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        List<GrantedAuthority> roles = new ArrayList<>();

        UserRole ur = urRepo.findById(user.getUm_id()).orElse(null);
        if (ur != null) {
            roles.add(new SimpleGrantedAuthority("ROLE_" + ur.getUr_role_id()));
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                roles
        );
    }
}
