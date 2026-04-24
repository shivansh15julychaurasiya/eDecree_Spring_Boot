package com.efiling.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.efiling.entity.CourtMaster;

public interface CourtMasterRepository extends JpaRepository<CourtMaster, Integer> {

	List<CourtMaster> findByCmBenchId(Integer benchId);
}