package com.efiling.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.efiling.entity.CaseFileDetail;

@Repository
public interface CaseFileDetailRepository extends JpaRepository<CaseFileDetail, Long> {

	@Query("SELECT c FROM CaseFileDetail c " +
		       "LEFT JOIN FETCH c.caseType ct " +
		       "WHERE ct.ctId = :caseTypeId " +
		       "AND c.fd_case_no = :caseNo " +
		       "AND c.fd_case_year = :caseYear")
		List<CaseFileDetail> findWithCaseType(
		    Long caseTypeId,
		    String caseNo,
		    Integer caseYear
		);

	
}
