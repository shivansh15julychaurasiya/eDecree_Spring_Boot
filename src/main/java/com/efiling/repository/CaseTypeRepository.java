package com.efiling.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.efiling.entity.CaseType;

public interface CaseTypeRepository extends JpaRepository<CaseType, Long> {

    // Get all case types
    List<CaseType> findAll();

	/*
	 * // Get case types by user (adjust table/column names as per your DB)
	 * 
	 * @Query("SELECT ct FROM CaseType ct JOIN ct.users u WHERE u.um_id = :userId")
	 * List<CaseType> findByUserId(Long userId);
	 */
}