package com.shweta.smart.models;

import lombok.Data;

@Data
public class Author {
    private String name;
    private String emailId;

    // Default constructor for Jackson
    public Author() {}

    Author(AuthorBuilder builder) {
        this.name = builder.name;
        this.emailId = builder.emailId;
    }

    // Explicit setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public static class AuthorBuilder {
        private String name;
        private String emailId;

        public AuthorBuilder(String name, String emailId) {
            this.name = name;
            this.emailId = emailId;
        }

        public Author build() {
            return new Author(this);
        }

    }
}
