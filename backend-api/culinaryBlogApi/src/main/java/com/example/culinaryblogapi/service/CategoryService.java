package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Category;

import java.util.List;

public interface CategoryService {
    Category addCategory(Category category);
    String deleteCategoryById(long categoryId);

    List<Category> getAll();

    Category save(Category category);
}
