package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAll();

    Product findProductById(long productId);
}
