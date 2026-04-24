package com.efiling.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.efiling.entity.LoginLog;

public interface LoginLogRepository  extends JpaRepository<LoginLog, Long> {

}
