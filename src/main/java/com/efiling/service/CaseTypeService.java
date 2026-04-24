package com.efiling.service;



import java.util.List;

import org.springframework.stereotype.Service;

import com.efiling.entity.CaseType;
import com.efiling.repository.CaseTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CaseTypeService {

    private final CaseTypeRepository caseTypeRepository;

 
    public List<CaseType> getCaseTypes() {
        return caseTypeRepository.findAll();
    }


	/*
	 * public List<CaseType> getCaseTypesByUser(Long userId) { return
	 * caseTypeRepository.findByUserId(userId); }
	 */
}