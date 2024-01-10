package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeService {
    Recipe addRecipe(Recipe recipe);

    String deleteRecipeById(long recipeId);

    List<Recipe> getAll();

    Recipe save(Recipe recipe);

    Optional<Recipe> findRecipeById(long recipeId);

    List<Recipe> getAllByCategoryId(long categoryId);
}
