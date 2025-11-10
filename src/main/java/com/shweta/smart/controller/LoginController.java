package com.shweta.smart.controller;

import com.shweta.smart.models.LoginDetails;
import com.shweta.smart.models.LoginRequest;
import com.shweta.smart.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app")
@Tag(name = "Authentication", description = "Authentication management APIs")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @Operation(summary = "Login to the application",
            description = "Authenticates user credentials and returns success status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful login",
                    content = @Content(schema = @Schema(implementation = Boolean.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for username: {}", loginRequest.getUsername());

        if (loginService.validateLogin(loginRequest)) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @Operation(summary = "Add new user",
            description = "Creates a new user in the login_details collection")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "User created successfully",
                    content = @Content(schema = @Schema(implementation = LoginDetails.class))),
            @ApiResponse(responseCode = "400",
                    description = "Username already exists")
    })
    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody LoginRequest request) {
        try {
            LoginDetails newUser = loginService.addUser(request);
            logger.info("New user created: {}", newUser.getUsername());
            return ResponseEntity.ok(newUser);
        } catch (IllegalArgumentException e) {
            logger.error("Failed to create user: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
