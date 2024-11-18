package com.shweta.smart.cart;

import com.shweta.smart.inventory.InventoryService;
import com.shweta.smart.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    @Autowired
    InventoryService inventoryService;

    private static List<Item> cartItems = new ArrayList<>();
    public boolean addToCart(Integer id) {
        if(inventoryService.inStock(id)){
            cartItems.add(inventoryService.getItem(id));
            inventoryService.reduceStock(id);
            return true;
        }
        return false;
    }
}
