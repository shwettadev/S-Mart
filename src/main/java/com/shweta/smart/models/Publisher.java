package com.shweta.smart.models;

import lombok.Data;

@Data
public class Publisher {
    private String name;
    private String address;

    // Default constructor for Jackson
    public Publisher() {}

    Publisher(PublisherBuilder builder) {
        this.name = builder.name;
        this.address = builder.address;
    }

    // Explicit setters
    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public static class PublisherBuilder {
        private String name;
        private String address;

        public PublisherBuilder(String name, String address) {
            this.name = name;
            this.address = address;
        }

        public Publisher build() {
            return new Publisher(this);
        }

    }

}
