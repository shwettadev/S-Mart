package com.shweta.smart.inventory;

import com.shweta.smart.model.Item;
import com.shweta.smart.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InventoryService {
    private static List<Item> itemList = new ArrayList<>();

    public static Map<Item, Integer> getItemStock() {
        return itemStock;
    }

    private static Map<Item, Integer> itemStock = new HashMap<>();

    static {
        createItems(itemList);
        initializeStock();
    }

    private static void initializeStock() {
        itemList.forEach(item -> {
            itemStock.put(item, (int) (Math.random() * 10));
        });
    }

    private static void createItems(List<Item> itemList) {
        Item i1 = new Item();
        i1.setName("Mother Dairy Buffalo Milk");
        i1.setCategory("Dairy");
        i1.setId(1);
        i1.setPrice(29);
        i1.setImgSrc("https://tinyurl.com/2r96582z");
        itemList.add(i1);

        Item i2 = new Item();
        i2.setName("Amul Milk");
        i2.setCategory("Dairy");
        i2.setId(2);
        i2.setPrice(31);
        i2.setImgSrc("https://tinyurl.com/mu95397j");
        itemList.add(i2);
    }

    public List<Product> getItemAndStock() {
        List<Product> productList = new ArrayList<>();
        for (Map.Entry<Item, Integer> entry : getItemStock().entrySet()) {
            Product product = new Product();
            Item item = entry.getKey();
            int quantity = entry.getValue();
            product.setId(item.getId());
            product.setName(item.getName());
            product.setPrice(item.getPrice());
            product.setCategory(item.getCategory());
            product.setImgSrc(item.getImgSrc());
            product.setQuantity(quantity);
            productList.add(product);
        }
        return productList;
    }

    public boolean inStock(Integer id) {
        return getStockById(id) > 0;
    }

    public Item getItem(Integer id) {
        for (Item item : itemList) {
            if (item.getId() == id) {
                return item;
            }
        }
        return null;
    }

    public void reduceStock(Integer id) {
        Integer existingStock = itemStock.get(getItem(id));
        itemStock.put(getItem(id), existingStock - 1);
    }

    public Integer getStockById(Integer id) {
        return itemStock.get(getItem(id));
    }
}
