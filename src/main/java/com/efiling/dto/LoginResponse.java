package com.efiling.dto;

import java.util.List;

import com.efiling.entity.ObjectMaster;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    
	private String accessToken;
    private String refreshToken;
    private String username;
    private String role;
    private String dashboard;
    private List<ObjectMaster> menu;

    // constructor + getters
    
    
    
}