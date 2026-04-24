package com.efiling.dto;

import java.util.List;

public class CaseFileDetailDTO {

    private Long id;
    private Long caseType;
    private String caseNo;
    private Integer caseYear;

    private String documentName;
    private String fileSource;

    private String firstPetitioner;
    private String firstRespondent;

    private List<String> petitioners;
    private List<String> respondents;

    private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCaseType() {
		return caseType;
	}

	public void setCaseType(Long caseType) {
		this.caseType = caseType;
	}

	public String getCaseNo() {
		return caseNo;
	}

	public void setCaseNo(String caseNo) {
		this.caseNo = caseNo;
	}

	public Integer getCaseYear() {
		return caseYear;
	}

	public void setCaseYear(Integer caseYear) {
		this.caseYear = caseYear;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public String getFileSource() {
		return fileSource;
	}

	public void setFileSource(String fileSource) {
		this.fileSource = fileSource;
	}

	public String getFirstPetitioner() {
		return firstPetitioner;
	}

	public void setFirstPetitioner(String firstPetitioner) {
		this.firstPetitioner = firstPetitioner;
	}

	public String getFirstRespondent() {
		return firstRespondent;
	}

	public void setFirstRespondent(String firstRespondent) {
		this.firstRespondent = firstRespondent;
	}

	public List<String> getPetitioners() {
		return petitioners;
	}

	public void setPetitioners(List<String> petitioners) {
		this.petitioners = petitioners;
	}

	public List<String> getRespondents() {
		return respondents;
	}

	public void setRespondents(List<String> respondents) {
		this.respondents = respondents;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    
    
    
}