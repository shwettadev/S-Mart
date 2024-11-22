package com.shweta.smart.model;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class User {
    Cart cart;

    public Cart getUserCart() {
        return getCart();
    }
    private Cart getCart() {
        if (cart == null) {
            cart = new Cart(new ArrayList<>(), 0.0);
        }
        return cart;
    }
}
