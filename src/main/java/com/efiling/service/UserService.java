package com.efiling.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.efiling.entity.User;
import com.efiling.exception.ResourceNotFoundException;
import com.efiling.repository.UserRepository;


@Service
public class UserService  {

    @Autowired
    private UserRepository repository;

   
  

    //  Get by ID
   
    public User getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    //  Get by Username
    
    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }

    //  Get All
    
    public List<User> getAll() {
        return repository.findAll();
    }

    //  Update
    
    public User update(Long id, User user) {

        User existing = getById(id);

        existing.setUm_fullname(user.getUm_fullname());
        existing.setUm_email(user.getUm_email());
        existing.setMod_date(user.getMod_date());
        existing.setUm_gender(user.getUm_gender());

        return repository.save(existing);
    }

    //  Soft Delete
    
    public void delete(Long id) {
        User user = getById(id);
        user.setUm_rec_status(0); // inactive
        repository.save(user);
    }
}