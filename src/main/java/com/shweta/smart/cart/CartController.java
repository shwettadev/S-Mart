package com.shweta.smart.cart;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class CartController {
    @Autowired
    CartService cartService;
    @GetMapping("getCart")
    public String getCart(){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(cartService.getCartItems());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
