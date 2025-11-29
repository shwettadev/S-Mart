package com.shweta.smart.repository;

import com.shweta.smart.models.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends MongoRepository<Book,String> {
    Book save(Book book);
    List<Book> findAll();


    void delete(Book book);
}
