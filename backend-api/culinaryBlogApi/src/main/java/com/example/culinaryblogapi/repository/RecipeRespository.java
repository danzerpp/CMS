package com.example.culinaryblogapi.repository;

import com.example.culinaryblogapi.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRespository extends JpaRepository<Recipe, Long> {
}
