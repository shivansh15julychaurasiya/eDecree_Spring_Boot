package com.efiling.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.efiling.dto.CaseFileDetailDTO;
import com.efiling.entity.CaseFileDetail;
import com.efiling.mapper.CaseFileDetailMapper;
import com.efiling.repository.CaseFileDetailRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CaseFileDetailService {
	

    private final CaseFileDetailRepository repository;
    private final CaseFileDetailMapper mapper;
	
	
	
	
	
	
	 public List<CaseFileDetail> getCaseFiles(CaseFileDetailDTO request) {

	        List<CaseFileDetail> list =
	                repository.findWithCaseType(
	                        request.getCaseType(),
	                        request.getCaseNo(),
	                        request.getCaseYear()
	                );
	        
      

	        return list;
	    }
	
	
	
	
	

}
