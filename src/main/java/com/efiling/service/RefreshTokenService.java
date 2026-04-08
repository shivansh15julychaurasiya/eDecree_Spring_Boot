package com.efiling.service;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efiling.entity.RefreshToken;
import com.efiling.repository.RefreshTokenRepository;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository repo;

    private final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000; // 7 days

    public RefreshToken createRefreshToken(String username, String token) {

        RefreshToken rt = new RefreshToken();
        rt.setUsername(username);
        rt.setToken(token);
        rt.setExpiryDate(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY));

        return repo.save(rt);
    }

    public RefreshToken verifyToken(String token) {

        RefreshToken rt = repo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (rt.getExpiryDate().before(new Date())) {
            repo.delete(rt);
            throw new RuntimeException("Refresh token expired");
        }

        return rt;
    }

    public void deleteByToken(String token) {
        repo.deleteByToken(token);
    }

    public void deleteByUsername(String username) {
        repo.deleteByUsername(username);
    }
}