package com.example.culinaryblogapi.repository;

import com.example.culinaryblogapi.model.Recipe;
import com.example.culinaryblogapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRespository extends JpaRepository<Recipe, Long> {
    Optional<Recipe> findRecipeById(long recipeId);
    List<Recipe> findAllByCategoryId(long categoryId);

    List<Recipe> findByTitleContainingIgnoreCase(String title);

    List<Recipe> findAllByCreatedByUserId(User user);

    List<Recipe> findAllByTitleLikeAndCreatedByUserId(String title, User user);
}
