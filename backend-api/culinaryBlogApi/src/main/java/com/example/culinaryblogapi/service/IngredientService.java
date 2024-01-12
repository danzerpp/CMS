package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Ingredient;
import com.example.culinaryblogapi.model.Recipe;

import java.util.List;

public interface IngredientService {
    void deleteRecipeById(long recipeId);

    Ingredient save(Ingredient ingredient);

    List<Ingredient> findAllByRecipe(Recipe recipe);

    void delete(Ingredient ingredient);
}
