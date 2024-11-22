package com.shweta.smart.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    private Map<Item,Integer> cartItems;
    private Double Value;
}
