package com.efiling.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.efiling.entity.User;
import com.efiling.entity.UserRole;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

	User findByUsername(String username);
    
    
    
}