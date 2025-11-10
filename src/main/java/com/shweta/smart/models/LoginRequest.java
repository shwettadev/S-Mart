package com.shweta.smart.models;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@Schema(description = "Login Request")
public class LoginRequest {
    @Schema(description = "Username for authentication", example = "user@example.com")
    private String username;

    @Schema(description = "Password for authentication", example = "password123")
    private String password;
}
