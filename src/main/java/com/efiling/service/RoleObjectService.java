package com.efiling.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.efiling.entity.RoleObject;
import com.efiling.exception.ResourceNotFoundException;
import com.efiling.repository.RoleObjectRepository;


@Service
@Transactional
public class RoleObjectService   {

    @Autowired
    private RoleObjectRepository repository;

    //  Create
 
    public RoleObject create(RoleObject roleObject) {
        return repository.save(roleObject);
    }

   
    //  Get by ID
    
    @Transactional(readOnly = true)
    public RoleObject getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoleObject not found with id: " + id));
    }

  

    // Get by role
	/*
	 * @Transactional(readOnly = true) public List<RoleObject> getByRoleId(Long
	 * roleId) { return repository.findByRoleId(roleId); }
	 */

    //  Soft Delete
  
    public void delete(Long id) {

        RoleObject existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoleObject not found with id: " + id));

        existing.setRo_rec_status(0); // soft delete
        repository.save(existing);
    }
}