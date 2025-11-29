package com.shweta.smart.config;

import com.shweta.smart.models.Author;
import com.shweta.smart.models.Book;
import com.shweta.smart.models.Publisher;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CommonConfig {

    @Bean
    public List<Book> initializeBooks() {

        List<Book> allBooks = new ArrayList<>();

        allBooks.add(new Book.BookBuilder("B001", "Java: The Complete Reference", 89.99, "Programming").
                withAuthor(new Author.AuthorBuilder("Herbert Schildt", "herbert@oracle.com").build()).
                withPublisher(new Publisher.PublisherBuilder("McGraw-Hill", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("B002", "Effective Java", 65.50, "Programming").
                withAuthor(new Author.AuthorBuilder("Joshua Bloch", "joshua@google.com").build()).
                withPublisher(new Publisher.PublisherBuilder("Addison-Wesley", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("B003", "Spring in Action", 75.00, "Framework").
                withAuthor(new Author.AuthorBuilder("Craig Walls", "craig@pivotal.io").build()).
                withPublisher(new Publisher.PublisherBuilder("Manning Publications", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("B004", "Clean Code", 55.25, "Software Development").
                withAuthor(new Author.AuthorBuilder("Robert C. Martin", "uncle@cleancoder.com").build()).
                withPublisher(new Publisher.PublisherBuilder("Prentice Hall", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("B005", "Design Patterns", 82.99, "Software Architecture").
                withAuthor(new Author.AuthorBuilder("Gang of Four", "patterns@addison.com").build()).
                withPublisher(new Publisher.PublisherBuilder("Addison-Wesley", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("B006", "Microservices Patterns", 69.75, "Software Architecture").
                withAuthor(new Author.AuthorBuilder("Chris Richardson", "chris@microservices.io").build()).
                withPublisher(new Publisher.PublisherBuilder("Manning Publications", "USA").build()).
                build());

        // Frontend Development Books
        allBooks.add(new Book.BookBuilder("F001", "React: Up & Running", 45.99, "Frontend").
                withAuthor(new Author.AuthorBuilder("Stoyan Stefanov", "stoyan@facebook.com").build()).
                withPublisher(new Publisher.PublisherBuilder("O'Reilly Media", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("F002", "Learning React", 52.50, "Frontend").
                withAuthor(new Author.AuthorBuilder("Alex Banks", "alex@moonhighway.com").build()).
                withPublisher(new Publisher.PublisherBuilder("O'Reilly Media", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("F003", "Vue.js in Action", 48.75, "Frontend").
                withAuthor(new Author.AuthorBuilder("Erik Hanchett", "erik@vuejs.org").build()).
                withPublisher(new Publisher.PublisherBuilder("Manning Publications", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("F004", "Angular Development with TypeScript", 58.00, "Frontend").
                withAuthor(new Author.AuthorBuilder("Yakov Fain", "yakov@angular.io").build()).
                withPublisher(new Publisher.PublisherBuilder("Manning Publications", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("F005", "JavaScript: The Definitive Guide", 62.99, "Frontend").
                withAuthor(new Author.AuthorBuilder("David Flanagan", "david@oreilly.com").build()).
                withPublisher(new Publisher.PublisherBuilder("O'Reilly Media", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("F006", "CSS: The Complete Guide", 39.99, "Frontend").
                withAuthor(new Author.AuthorBuilder("Maximilian Schwarzmüller", "max@academind.com").build()).
                withPublisher(new Publisher.PublisherBuilder("Packt Publishing", "UK").build()).
                build());

        allBooks.add(new Book.BookBuilder("F007", "Modern JavaScript for Web Development", 44.25, "Frontend").
                withAuthor(new Author.AuthorBuilder("Nicolás Bevacqua", "nicolas@ponyfoo.com").build()).
                withPublisher(new Publisher.PublisherBuilder("Manning Publications", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("F008", "Progressive Web Apps", 41.50, "Frontend").
                withAuthor(new Author.AuthorBuilder("Jason Grigsby", "jason@cloudfour.com").build()).
                withPublisher(new Publisher.PublisherBuilder("A Book Apart", "USA").build()).
                build());

        allBooks.add(new Book.BookBuilder("F009", "Node.js Web Development", 55.75, "Frontend").
                withAuthor(new Author.AuthorBuilder("David Herron", "david@nodejs.org").build()).
                withPublisher(new Publisher.PublisherBuilder("Packt Publishing", "UK").build()).
                build());

        allBooks.add(new Book.BookBuilder("F010", "HTML5 and CSS3 All-in-One", 67.99, "Frontend").
                withAuthor(new Author.AuthorBuilder("Andy Harris", "andy@webdev.com").build()).
                withPublisher(new Publisher.PublisherBuilder("Wiley", "USA").build()).
                build());

        return allBooks;
    }


    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("S-Mart API Documentation")
                        .version("1.0.0")
                        .description("RESTful API documentation for S-Mart application")
                        .contact(new Contact()
                                .name("Shweta")
                                .email("your.email@example.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://www.apache.org/licenses/LICENSE-2.0.html")));
    }
}
