package com.efiling.controller;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efiling.dto.CaseFileDetailDTO;
import com.efiling.entity.CaseFileDetail;
import com.efiling.response.ApiResponse;
import com.efiling.service.CaseFileDetailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/casefile")
@RequiredArgsConstructor
public class CaseFileController {

    private final CaseFileDetailService service;

    @PostMapping("/getCaseFileList")
    public ResponseEntity<ApiResponse<?>> getCaseList(
            @RequestBody CaseFileDetailDTO request) {
    	
    	System.out.println("Received Request: " + request.getCaseType() + ", " + request.getCaseNo() + ", " + request.getCaseYear());

        List<CaseFileDetail> list = service.getCaseFiles(request);

        // DB DATA FOUND
        if (!list.isEmpty()) {
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Data fetched from DB", list)
            );
        }
        
        
        return ResponseEntity.ok(
				new ApiResponse<>(false, "No data found in DB", null)
		);

    }
}