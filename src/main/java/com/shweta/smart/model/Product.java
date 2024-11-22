package com.shweta.smart.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class Product extends Item{
    int quantity;
}
