package com.efiling.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "case_types")
public class CaseType {

    @Id
    @Column(name = "ct_id")
    private Long ctId;

    @Column(name = "ct_label")
    private String ctLabel;

    @Column(name = "ct_name")
    private String ctName;

    @Column(name = "ct_bench_code")
    private Long ctBenchCode;

    @Column(name = "ct_lk_mid")
    private Long ctLkMid;

    @Column(name = "ct_status")
    private Integer ctStatus;

    @Column(name = "ct_ccms_id")
    private Integer ctCcmsId;

    // Default constructor (required by JPA)
    public CaseType() {}

    // Getters and Setters

    public Long getCtId() {
        return ctId;
    }

    public void setCtId(Long ctId) {
        this.ctId = ctId;
    }

    public String getCtLabel() {
        return ctLabel;
    }

    public void setCtLabel(String ctLabel) {
        this.ctLabel = ctLabel;
    }

    public String getCtName() {
        return ctName;
    }

    public void setCtName(String ctName) {
        this.ctName = ctName;
    }

    public Long getCtBenchCode() {
        return ctBenchCode;
    }

    public void setCtBenchCode(Long ctBenchCode) {
        this.ctBenchCode = ctBenchCode;
    }

    public Long getCtLkMid() {
        return ctLkMid;
    }

    public void setCtLkMid(Long ctLkMid) {
        this.ctLkMid = ctLkMid;
    }

    public Integer getCtStatus() {
        return ctStatus;
    }

    public void setCtStatus(Integer ctStatus) {
        this.ctStatus = ctStatus;
    }

    public Integer getCtCcmsId() {
        return ctCcmsId;
    }

    public void setCtCcmsId(Integer ctCcmsId) {
        this.ctCcmsId = ctCcmsId;
    }
}