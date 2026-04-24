package com.efiling.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.efiling.entity.CourtUserMapping;

public interface CourtUserMappingRepository extends JpaRepository<CourtUserMapping, Long> {

	/*
	 * List<CourtUserMapping> findByCum_user_midL(Long userId);
	 * 
	 * List<CourtUserMapping> findByCum_court_mid(Integer courtId);
	 * 
	 * List<CourtUserMapping> findByCum_jg_mid(Long judgeId);
	 */
    
   
    Optional<CourtUserMapping> findByCumUserMid(Long userId);
}