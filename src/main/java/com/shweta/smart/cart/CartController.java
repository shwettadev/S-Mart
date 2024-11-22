package com.shweta.smart.cart;

import com.shweta.smart.model.Cart;
import com.shweta.smart.model.Item;
import com.shweta.smart.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CartController {
    @Autowired
    CartService cartService;

    @PostMapping("/addToCart")
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cart> addToCart(Integer id) {
        Cart cart = cartService.addToCart(id);
        return ResponseEntity.ok(cart);
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(CartController.class);

    @GetMapping("/getCart")
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cart> getCart() {
        LOGGER.info("Getting user cart");
        Cart cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }
}
