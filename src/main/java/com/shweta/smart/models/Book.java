package com.shweta.smart.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "books_collection")
public class Book {
    @Id
    private String isbn;
    private String name;
    private Double price;
    private Publisher publisher;
    private Author author;
    private String category;
    private Integer stock;
    // Default constructor for Jackson
    public Book() {}

    private Book(BookBuilder builder) {
        this.isbn = builder.isbn;
        this.name = builder.name;
        this.price = builder.price;
        this.author = builder.author;
        this.publisher = builder.publisher;
        this.category = builder.category;
        this.stock = builder.stock;
    }

    // Explicit setters to ensure they work with updates
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setStock(Integer stock) {this.stock = stock;}

    public static class BookBuilder {
        public String category;
        private String isbn;
        private String name;
        private Double price;
        private Publisher publisher;
        private Author author;
        private Integer stock;

        public BookBuilder(String isbn, String name, Double price,String category, Integer stock) {
            this.isbn = isbn;
            this.name = name;
            this.price = price;
            this.category = category;
            this.stock = stock;
        }

        public BookBuilder withPublisher(Publisher publisher) {
            this.publisher = publisher;
            return this;
        }

        public BookBuilder withAuthor(Author author) {
            this.author = author;
            return this;
        }

        public Book build(){
            return new Book(this);
        }

    }

}
