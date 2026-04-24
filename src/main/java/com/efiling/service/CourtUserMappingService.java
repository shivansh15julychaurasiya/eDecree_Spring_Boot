package com.efiling.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.efiling.entity.CourtUserMapping;
import com.efiling.exception.ResourceNotFoundException;
import com.efiling.repository.CourtUserMappingRepository;
import com.efiling.service.CourtUserMappingService;

@Service
@Transactional
public class CourtUserMappingService {

    @Autowired
    private CourtUserMappingRepository repository;

    //  Create mapping
    
    public CourtUserMapping create(CourtUserMapping mapping) {
        return repository.save(mapping);
    }

    //  Get by ID
    
    @Transactional(readOnly = true)
    public CourtUserMapping getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mapping not found with id: " + id));
    }

    //  Get by User
    
  
    public CourtUserMapping getByUserCourtMapping(Long userId) {
		return repository.findByCumUserMid(userId).orElseThrow(() -> new ResourceNotFoundException("Mapping not found with user id: " + userId));
	}
    
    
    
    //  Get by Court
   
    //  Get by Judge
    
  

    //  Delete
    
    public void delete(Long id) {

        CourtUserMapping mapping = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mapping not found with id: " + id));

        repository.delete(mapping);
    }
}