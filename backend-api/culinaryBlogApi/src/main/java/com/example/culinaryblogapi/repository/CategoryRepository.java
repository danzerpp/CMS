package com.example.culinaryblogapi.repository;

import com.example.culinaryblogapi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoryById(long id);

    Category findCategoryByName(String name);

}
