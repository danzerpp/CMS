package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Recipe;
import com.example.culinaryblogapi.model.User;

import java.util.List;
import java.util.Optional;

public interface RecipeService {
    Recipe addRecipe(Recipe recipe);

    String deleteRecipeById(long recipeId);

    List<Recipe> getAll();

    Recipe save(Recipe recipe);

    Optional<Recipe> findRecipeById(long recipeId);

    List<Recipe> getAllByCategoryId(long categoryId);

    List<Recipe> findAllByTitleLike(String title);

    List<Recipe> findAllByTitleLikeAndCreatedByUserId(String title, User user);
    List<Recipe> findAllByCreatedByUserId(User user);

}
