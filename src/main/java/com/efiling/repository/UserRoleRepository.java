package com.efiling.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.efiling.entity.UserRole;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    //  Find role by name (MOST IMPORTANT)
	/*
	 * Optional<UserRole> findByName(String name);
	 * 
	 * // Check if role exists boolean existsByName(String name);
	 */
}