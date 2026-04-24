package com.efiling.controller;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efiling.entity.CaseType;
import com.efiling.response.ApiResponse;
import com.efiling.service.CaseTypeService;
import com.efiling.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/caseType")
@RequiredArgsConstructor
public class CaseTypeController {

    private final CaseTypeService caseTypeService;

    @GetMapping("/getCaseTypes")
    public ResponseEntity<ApiResponse<?>> getCaseTypes() {

        //  Get user from JWT
//        CustomUserDetailsService userDetails = (CustomUserDetailsService)
//                SecurityContextHolder.getContext().getAuthentication().getPrincipal();

				/*
				 * Long userId = userDetails.getUserId(); 
				 * String role = userDetails.getRole();
				 */
        String role="Review_Officer";

        List<CaseType> caseTypes;

        if (isPrivilegedRole(role)) {
            caseTypes = caseTypeService.getCaseTypes(); // TODO: user-based later
        } else {
            caseTypes = caseTypeService.getCaseTypes();
        }

        if (caseTypes != null && !caseTypes.isEmpty()) {
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Case types fetched successfully", caseTypes)
            );
        }

        return ResponseEntity.ok(
                new ApiResponse<>(false, "No case types found", null)
        );
    }

    private boolean isPrivilegedRole(String role) {
        return "Review_Officer".equals(role) || "Assistant Review Officer".equals(role);
    }
}