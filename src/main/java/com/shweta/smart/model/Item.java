package com.shweta.smart.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class Item {
    private String name;
    private String category;
    private Integer price;
    private Integer id;
    private String imgSrc;
}