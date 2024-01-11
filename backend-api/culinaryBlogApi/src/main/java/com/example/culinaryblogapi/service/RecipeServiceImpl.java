package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Recipe;
import com.example.culinaryblogapi.model.User;
import com.example.culinaryblogapi.repository.RecipeRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService{

    @Autowired
    private RecipeRespository recipeRespository;

    @Override
    public Recipe addRecipe(Recipe recipe) {
        return recipeRespository.save(recipe);
    }

    @Override
    public String deleteRecipeById(long recipeId) {
        recipeRespository.deleteById(recipeId);
        return "deleted";
    }

    @Override
    public List<Recipe> getAll() {
        return recipeRespository.findAll();
    }

    @Override
    public Recipe save(Recipe recipe) {
        return recipeRespository.save(recipe);
    }

    @Override
    public Optional<Recipe> findRecipeById(long recipeId) {
        return recipeRespository.findRecipeById(recipeId);
    }

    @Override
    public List<Recipe> getAllByCategoryId(long categoryId) {
        return recipeRespository.findAllByCategoryId(categoryId);
    }

    @Override
    public List<Recipe> findAllByTitleLike(String title) {
        return recipeRespository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Recipe> findAllByTitleLikeAndCreatedByUserId(String title, User user) {
        return recipeRespository.findAllByTitleLikeAndCreatedByUserId(title, user);
    }

    @Override
    public List<Recipe> findAllByCreatedByUserId(User user) {
        return recipeRespository.findAllByCreatedByUserId(user);
    }
}
