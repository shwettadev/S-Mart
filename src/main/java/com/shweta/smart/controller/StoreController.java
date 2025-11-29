package com.shweta.smart.controller;

import com.shweta.smart.models.Book;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/store")
public class StoreController {

    Logger logger = LoggerFactory.getLogger(StoreController.class);

    @Autowired
    List<Book> books;


    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(books);
    }

    @PostMapping("/book/update")
    public ResponseEntity<Book> updateBooks(@RequestBody Book updateBook) {
        Optional<Book> optionalBook =
                books.stream().filter(b -> b.getIsbn().equals(updateBook.getIsbn())).findFirst();
        if (optionalBook.isEmpty()) {
            logger.error("Book not available");
            return ResponseEntity.badRequest().body(updateBook);
        }
        Book bookFound = optionalBook.get();
        bookFound.getAuthor().setEmailId(updateBook.getAuthor().getEmailId());
        bookFound.setPrice(updateBook.getPrice());
        return ResponseEntity.ok(bookFound);
    }


    @PostMapping("/book/delete")
    public ResponseEntity<String> deletebook(@RequestParam String isbn) {
        Optional<Book> optionalBook = books.stream().filter(b -> isbn.equals(b.getIsbn())).findFirst();
        if (optionalBook.isEmpty()) {
            logger.error("Book not available");
            return ResponseEntity.badRequest().body(isbn);
        }
        books.remove(optionalBook.get());
        return ResponseEntity.ok("Book deleted");
    }

}