package com.shweta.smart.cart;

import com.shweta.smart.inventory.InventoryService;
import com.shweta.smart.model.Cart;
import com.shweta.smart.model.Item;
import com.shweta.smart.model.User;
import com.shweta.smart.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CartService {
    @Autowired
    UserService userService;
    @Autowired
    InventoryService inventoryService;

    private static final Logger LOGGER = LoggerFactory.getLogger(CartService.class);

    public Cart addToCart(Integer id) {
        LOGGER.info("Adding item with id={} to cart", id);
        User user = userService.getLoggedInUser("abc");
        Cart userCart = user.getUserCart();
        if (!inventoryService.inStock(id)) {
            LOGGER.error("Item with id={} is out of stock", id);
            return userCart;
        }
        Item item = inventoryService.getItem(id);
        userCart.getCartItems().add(item);
        userCart.setValue(userCart.getValue() + item.getPrice());
        inventoryService.reduceStock(id);
        LOGGER.info("Add to cart completed for item with id={}", id);
        return userCart;
    }

    public Cart getCart() {
        User user = userService.getLoggedInUser("abc");
        return user.getUserCart();
    }
}

//Is Java pass by value or pass by reference ? - Pass by copy of reference
