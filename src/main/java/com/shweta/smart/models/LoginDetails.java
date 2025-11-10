package com.shweta.smart.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "login_details")
public class LoginDetails {
    @Id
    private String id;
    private String username;
    private String password;
}
