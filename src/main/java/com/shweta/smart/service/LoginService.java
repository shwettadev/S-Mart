package com.shweta.smart.service;

import com.shweta.smart.models.LoginDetails;
import com.shweta.smart.models.LoginRequest;
import com.shweta.smart.models.SignUpRequest;
import com.shweta.smart.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public boolean validateLogin(LoginRequest loginRequest) {
        Optional<LoginDetails> byUsername = loginRepository.findByUsername(loginRequest.getUsername());
        Optional<Boolean> b = byUsername.map(loginDetails -> loginDetails.getPassword().equals(loginRequest.getPassword()));
        return b.orElse(false);
    }

    public String registerNewUser(SignUpRequest request) {
        // Check if username already exists
        if (loginRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Create new login details
        LoginDetails newUser = new LoginDetails();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword()); // Note: In production, password should be hashed

        // Save to MongoDB
        LoginDetails details = loginRepository.save(newUser);
        return details.getUsername();
    }
}
