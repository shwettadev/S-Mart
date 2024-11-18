package com.shweta.smart.inventory;

import com.shweta.smart.model.Item;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InventoryService {
    private static List<Item> itemList = new ArrayList<>();
    private static Map<Integer, Integer> itemStockMap = new HashMap();

    static {
        createItems(itemList);
        initializeStock(itemList,itemStockMap);
    }

    private static void initializeStock(List<Item> itemList, Map<Integer, Integer> itemStockMap) {
        itemList.forEach(item -> {
            itemStockMap.put(item.getId(), (int) (Math.random()*10));
        });
    }


    private static void createItems(List<Item> itemList) {
        Item i1 = new Item();
        i1.setName("Mother Dairy Fresh Cow Milk");
        i1.setCategory("Dairy");
        i1.setId(1);
        i1.setPrice(28);
        i1.setImgSrc("https://bl-i.thgim.com/public/incoming/q80t0j/article67744653.ece/alternates/FREE_1200/WhatsApp%20Image%202024-01-16%20at%202.43.13%20PM.jpeg");
        itemList.add(i1);

        Item i2 = new Item();
        i2.setName("Amul Milk");
        i2.setCategory("Dairy");
        i2.setId(2);
        i2.setPrice(30);
        i2.setImgSrc("https://www.sudamadairy.com/wp-content/uploads/2023/09/Amul_buffalo_milk-1.jpg");
        itemList.add(i2);
    }

    public List<Item> getItemsList() {
        return itemList;
    }

    public boolean inStock(Integer id) {
        return itemStockMap.get(id) > 0;
    }

    public Item getItem(Integer id) {
        Item item = getItemsList().stream().filter(i -> i.getId() == id).findFirst().get();
        if(null != item && item.getId()==id){
            return item;
        }
        return null;
    }

    public void reduceStock(Integer id) {
        int updatedStock = itemStockMap.get(id)-1;
        itemStockMap.put(id, updatedStock);
    }

    public Integer getStockById(Integer id) {
        return itemStockMap.get(id);
    }
}
