package com.shweta.smart.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SignUpRequest extends LoginRequest {
    private String firstName;
    private String lastName;
    private String emailId;
}
