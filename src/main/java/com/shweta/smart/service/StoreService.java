package com.shweta.smart.service;

import com.shweta.smart.models.Book;
import com.shweta.smart.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

    StoreRepository storeRepository;

    @Autowired
    StoreService(StoreRepository storeRepository){
        this.storeRepository = storeRepository;
    }


    public Book addBook(Book book) {
        //perform validations
        //check if book already exists if yes then dont add
        // finally add
        storeRepository.save(book);
        return book;
    }

    public List<Book> getBooks() {
        return storeRepository.findAll();
    }

    public void deleteBook(Book book) {
         storeRepository.delete(book);
    }
}
