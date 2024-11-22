package com.shweta.smart.dashboard;

import com.shweta.smart.inventory.InventoryService;
import com.shweta.smart.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DashboardController {
    @Autowired
    InventoryService inventoryService;

    @GetMapping("/dashboard")
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Product>> loadDashboard() {
        List<Product> productList = inventoryService.getItemAndStock();
        return ResponseEntity.ok(productList);
    }
}
