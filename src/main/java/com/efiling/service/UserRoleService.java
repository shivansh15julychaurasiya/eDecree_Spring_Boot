package com.efiling.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efiling.entity.UserRole;
import com.efiling.repository.UserRoleRepository;

@Service
public class UserRoleService {

    private static final Logger log = LoggerFactory.getLogger(UserRoleService.class);

    @Autowired
    private UserRoleRepository userRoleRepository;

  
	/*
	 * public UserRole getByName(String roleName) { log.info("Fetching role={}",
	 * roleName);
	 * 
	 * return userRoleRepository.findByName(roleName) .orElseThrow(() -> {
	 * log.error("Role not found: {}", roleName); return new
	 * RuntimeException("Role not found: " + roleName); }); }
	 */
    
    
    // ================= SAVE ROLE =================

    public UserRole saveRole(UserRole urole) {

        log.info("Saving role={}", urole);

		/*
		 * // Check if already exists if (userRoleRepository.existsByName(roleName)) {
		 * log.warn("Role already exists: {}", roleName); return
		 * userRoleRepository.findByName(roleName).get(); }
		 * 
		 * // Create new role UserRole role = new UserRole(); role.setName(roleName);
		 */

        UserRole savedRole = userRoleRepository.save(urole);

       

        return savedRole;
    }
    
    
    
    

	/*
	 * public UserRole getDefaultRole() { log.info("Assigning default role USER");
	 * return getByName("USER"); }
	 * 
	 * public UserRole getRoleByType(String type) {
	 * 
	 * if ("AOR".equalsIgnoreCase(type)) {
	 * log.info("Assigning ADMIN role for type={}", type); return
	 * getByName("ADMIN"); }
	 * 
	 * log.info("Assigning USER role for type={}", type); return getDefaultRole(); }
	 */
}
