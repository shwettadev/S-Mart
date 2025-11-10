package com.shweta.smart.repository;

import com.shweta.smart.models.LoginDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends MongoRepository<LoginDetails, String> {
    Optional<LoginDetails> findByUsername(String username);

    // Check if username already exists
    boolean existsByUsername(String username);

    // Save a new user to the collection
    LoginDetails save(LoginDetails loginDetails);
}
