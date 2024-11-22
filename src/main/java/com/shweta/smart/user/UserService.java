package com.shweta.smart.user;

import com.shweta.smart.model.Cart;
import com.shweta.smart.model.Item;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    Cart cart;
    public Cart getCart(){
        if(this.cart == null){
            cart = new Cart(new HashMap<>(), 0.0);
        }
        return cart;
    }

    public Cart addToCart(Item cartItem) {
        Map<Item, Integer> cartMap = this.getCart().getCartItems();
        if (cartMap.containsKey(cartItem)) {
            int currQuantity = cartMap.get(cartItem);
            cartMap.put(cartItem, currQuantity + 1);
        } else {
            cartMap.put(cartItem, 1);
        }
        Double cartValue = this.getCart().getValue();
        cartValue = cartValue + cartItem.getPrice();
        getCart().setValue(cartValue);
        return getCart();
    }
}
