package com.shweta.smart.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InventoryController {
    @Autowired
    InventoryService inventoryService;
    @GetMapping("/viewStockById")
    public Integer viewStockById(@RequestParam Integer id){
        return inventoryService.getStockById(id);
    }
}
