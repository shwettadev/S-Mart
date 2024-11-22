package com.shweta.smart.cart;

import com.shweta.smart.inventory.InventoryService;
import com.shweta.smart.model.Cart;
import com.shweta.smart.model.Item;
import com.shweta.smart.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CartService {
    @Autowired
    InventoryService inventoryService;
    @Autowired
    UserService userService;

    public Cart addToCart(Item item) {
        return userService.addToCart(item);
    }

    public Cart getCartItems() {
        return userService.getCart();
    }
}
