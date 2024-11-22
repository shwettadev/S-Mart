package com.shweta.smart.dashboard;

import com.shweta.smart.cart.CartService;
import com.shweta.smart.inventory.InventoryService;
import com.shweta.smart.model.Cart;
import com.shweta.smart.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class DashboardController {
    @Autowired
    InventoryService inventoryService;
    @Autowired
    CartService cartService;

    @GetMapping("/dashboard")
    public ResponseEntity<List<Item>> loadDashboard() {
        return ResponseEntity.ok(inventoryService.getItemsList());
    }

    @PostMapping("/addToCart")
    public Cart addToCart(Integer id) {
        return cartService.addToCart(inventoryService.getItem(id));
    }
}
