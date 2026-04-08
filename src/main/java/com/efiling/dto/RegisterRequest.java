package com.efiling.dto;

import lombok.Data;



import javax.validation.constraints.*;


@Data
public class RegisterRequest {

    @NotBlank(message = "User type is required")
    private String type;

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email")
    private String email;

    private String gender;

    @NotBlank(message = "Mobile is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    private String mobile;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Minimum 6 characters required")
    private String password;

    @NotBlank(message = "Confirm Password is required")
    private String confirmPassword;

    private String rollNo;
    private String enrollNo;
    private Integer enrollYear;
    private Long adhar;

    // getters & setters
}