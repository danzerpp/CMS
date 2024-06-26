package com.example.culinaryblogapi.repository;

import com.example.culinaryblogapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductById(long productId);
}
