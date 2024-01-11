package com.example.culinaryblogapi.repository;

import com.example.culinaryblogapi.model.Ingredient;
import com.example.culinaryblogapi.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRespository extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findAllByRecipe(Recipe recipe);
}
