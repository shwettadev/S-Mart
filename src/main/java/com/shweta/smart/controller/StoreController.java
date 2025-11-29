package com.shweta.smart.controller;

import com.shweta.smart.models.Book;
import com.shweta.smart.service.StoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/store")
public class StoreController {

    Logger logger = LoggerFactory.getLogger(StoreController.class);

    @Autowired
    StoreService storeService;

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooks() {
        List<Book> allBooks = storeService.getBooks();
        if(allBooks == null || allBooks.isEmpty()){
            logger.warn("No books in store");
        }
        return ResponseEntity.ok(allBooks);
    }

    @PostMapping("/book/update")
    public ResponseEntity<Book> updateBooks(@RequestBody Book updateBook) {
        List<Book> allBooks = storeService.getBooks();
        Optional<Book> optionalBook =
                allBooks.stream().filter(b -> b.getIsbn().equals(updateBook.getIsbn())).findFirst();
        if (optionalBook.isEmpty()) {
            logger.error("Book not available");
            return ResponseEntity.badRequest().body(updateBook);
        }
        Book bookFound = optionalBook.get();
        bookFound.getAuthor().setEmailId(updateBook.getAuthor().getEmailId());
        bookFound.setPrice(updateBook.getPrice());
        storeService.addBook(bookFound);
        return ResponseEntity.ok(bookFound);
    }


    @PostMapping("/book/delete")
    public ResponseEntity<String> deletebook(@RequestParam String isbn) {
        List<Book> allBooks = storeService.getBooks();
        Optional<Book> optionalBook = allBooks.stream().filter(b -> isbn.equals(b.getIsbn())).findFirst();
        if (optionalBook.isEmpty()) {
            logger.error("Book not available");
            return ResponseEntity.badRequest().body(isbn);
        }
        storeService.deleteBook(optionalBook.get());
        return ResponseEntity.ok("Book deleted");
    }

    @PostMapping("book/add")
    public ResponseEntity<Book> addBook(@RequestBody Book newBook){

        Book book = storeService.addBook(newBook);
        if(book == null){
            logger.warn("Book not added");
        }
        //books.add(newBook);
        logger.info("Book {} added successfully", newBook);
        return ResponseEntity.ok(newBook);
    }

    @PostMapping("book/add/mul")
    public ResponseEntity<Book> addBookmul(@RequestBody List<Book> newbooks){
        newbooks.forEach(b -> {
            Book book = storeService.addBook(b);
            if(book == null){
                logger.warn("Book not added");
            }
        });
        logger.info("Books {} added successfully", newbooks);
        return ResponseEntity.ok(newbooks.getFirst());
    }

}