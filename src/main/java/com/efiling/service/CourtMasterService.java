package com.efiling.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.efiling.entity.CourtMaster;
import com.efiling.exception.ResourceNotFoundException;
import com.efiling.repository.CourtMasterRepository;
import com.efiling.service.CourtMasterService;

@Service
@Transactional
public class CourtMasterService  {

    @Autowired
    private CourtMasterRepository repository;

    //  Create
    
    public CourtMaster create(CourtMaster court) {

        court.setCm_cr_date(new Date());
        court.setCm_rec_status(1); // active

        return repository.save(court);
    }

    //  Update
    
   
    //  Get by ID
    
    @Transactional(readOnly = true)
    public CourtMaster getByCourtMasterById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Court not found with id: " + id));
    }

    //  Get all active
    
	/*
	 * @Transactional(readOnly = true) public List<CourtMaster> getAll() { return
	 * repository.findByCm_rec_status(1); }
	 */
    //  Get by Bench
    
	/*
	 * @Transactional(readOnly = true) public List<CourtMaster> getByBench(Integer
	 * benchId) { return repository.findByCm_bench_id(benchId); }
	 */

    //  Soft Delete
    
    public void delete(Integer id) {

        CourtMaster court = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Court not found with id: " + id));

        court.setCm_rec_status(0);
        repository.save(court);
    }
}