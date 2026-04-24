package com.efiling.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.efiling.entity.ObjectMaster;
import com.efiling.exception.ResourceNotFoundException;
import com.efiling.repository.ObjectMasterRepository;
import com.efiling.service.ObjectMasterService;

@Service
@Transactional
public class ObjectMasterService  {

    @Autowired
    private ObjectMasterRepository repository;

    //  Create
    
    public ObjectMaster create(ObjectMaster obj) {
        obj.setOm_cr_date(new Date());
        obj.setOmRecStatus(1); // active
        return repository.save(obj);
    }

    
    

    public List<ObjectMaster> getUserObjects(Long userId) {
        return repository.findUserObjects(userId);
    }
    
    
    //  Update
    
    public ObjectMaster update(Long id, ObjectMaster obj) {

        ObjectMaster existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Object not found with id: " + id));

        existing.setOm_object_name(obj.getOm_object_name());
        existing.setOm_object_link(obj.getOm_object_link());
        existing.setOm_parent_id(obj.getOm_parent_id());
        existing.setOm_object_stages(obj.getOm_object_stages());
        existing.setOm_mod_by(obj.getOm_mod_by());
        existing.setOm_mod_date(new Date());

        return repository.save(existing);
    }

    //  Get by ID
    
    @Transactional(readOnly = true)
    public ObjectMaster getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Object not found with id: " + id));
    }

    //  Get all active
  
    //  Soft delete
    
    public void delete(Long id) {

        ObjectMaster obj = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Object not found with id: " + id));

        obj.setOmRecStatus(0); // inactive
        repository.save(obj);
    }
}