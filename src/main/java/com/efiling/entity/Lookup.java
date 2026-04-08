package com.efiling.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "lookup")
public class Lookup {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lookupseq")
    @SequenceGenerator(name = "lookupseq", sequenceName = "lookupseq", allocationSize = 1)
    @Column(name = "lk_id")
    private Long lkId;

    @Column(name = "lk_longname")
    private String lkLongname;

    @Column(name = "lk_setname")
    private String lkSetname;

    @Column(name = "lk_value")
    private String lkValue;

    @Column(name = "lk_parent")
    private Long lkParent;

    @Column(name = "lk_serial_no")
    private Long lkSerialNo;

    @Column(name = "lk_cr_by")
    private Long crBy;

    @Column(name = "lk_cr_date")
    private Date crDate;

    @Column(name = "lk_mod_by")
    private Long modBy;

    @Column(name = "lk_mod_date")
    private Date modDate;

    @Column(name = "lk_rec_status")
    private Integer lkRecStatus;

    @Column(name = "lk_priority")
    private Integer lkPriority;

    // ===== GETTERS & SETTERS =====

    public Long getLkId() {
        return lkId;
    }

    public void setLkId(Long lkId) {
        this.lkId = lkId;
    }

    public String getLkLongname() {
        return lkLongname;
    }

    public void setLkLongname(String lkLongname) {
        this.lkLongname = lkLongname;
    }

    public String getLkSetname() {
        return lkSetname;
    }

    public void setLkSetname(String lkSetname) {
        this.lkSetname = lkSetname;
    }

    public String getLkValue() {
        return lkValue;
    }

    public void setLkValue(String lkValue) {
        this.lkValue = lkValue;
    }

    public Long getLkParent() {
        return lkParent;
    }

    public void setLkParent(Long lkParent) {
        this.lkParent = lkParent;
    }

    public Long getLkSerialNo() {
        return lkSerialNo;
    }

    public void setLkSerialNo(Long lkSerialNo) {
        this.lkSerialNo = lkSerialNo;
    }

    public Long getCrBy() {
        return crBy;
    }

    public void setCrBy(Long crBy) {
        this.crBy = crBy;
    }

    public Date getCrDate() {
        return crDate;
    }

    public void setCrDate(Date crDate) {
        this.crDate = crDate;
    }

    public Long getModBy() {
        return modBy;
    }

    public void setModBy(Long modBy) {
        this.modBy = modBy;
    }

    public Date getModDate() {
        return modDate;
    }

    public void setModDate(Date modDate) {
        this.modDate = modDate;
    }

    public Integer getLkRecStatus() {
        return lkRecStatus;
    }

    public void setLkRecStatus(Integer lkRecStatus) {
        this.lkRecStatus = lkRecStatus;
    }

    public Integer getLkPriority() {
        return lkPriority;
    }

    public void setLkPriority(Integer lkPriority) {
        this.lkPriority = lkPriority;
    }
}