package com.efiling.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efiling.entity.Lookup;
import com.efiling.repository.LookupRepository;

@Service
public class LookupService{

    @Autowired
    private LookupRepository lookupRepository;

 
    public Lookup save(Lookup lookup) {
        return lookupRepository.save(lookup);
    }

    
    public List<Lookup> findAll() {
        return lookupRepository.findAll();
    }

  
    public Lookup findById(Long id) {
        return lookupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lookup not found with id: " + id));
    }

    public List<Lookup> findBySetName(String setName) {
        return lookupRepository.findByLkSetname(setName);
    }
    
    public Lookup findByLongName(String longName){
    	
    	return  lookupRepository.findByLkLongnameIgnoreCase(longName).get(0);
    }


	/*
	 * public Lookup findBySetNameAndValue(String setName, String value) { return
	 * lookupRepository .findByLkSetnameAndLkValue(setName, value) .orElseThrow(()
	 * -> new RuntimeException("Lookup not found")); }
	 */

   
    public void delete(Long id) {
        lookupRepository.deleteById(id);
    }
}