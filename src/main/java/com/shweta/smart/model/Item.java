package com.shweta.smart.model;

import lombok.Data;

@Data
public class Item {
    private String name;
    private String category;
    private Integer price;
    private Integer id;
    private String imgSrc;

}