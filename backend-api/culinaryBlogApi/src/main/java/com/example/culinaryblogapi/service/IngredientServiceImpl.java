package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Ingredient;
import com.example.culinaryblogapi.model.Recipe;
import com.example.culinaryblogapi.repository.IngredientRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientRespository ingredientRespository;

    @Override
    public void deleteRecipeById(long recipeId) {
        ingredientRespository.deleteById(recipeId);
    }

    @Override
    public Ingredient save(Ingredient ingredient) {
        return ingredientRespository.save(ingredient);
    }

    @Override
    public List<Ingredient> findAllByRecipe(Recipe recipe) {
        return ingredientRespository.findAllByRecipe(recipe);
    }

    @Override
    public void delete(Ingredient ingredient) {
        ingredientRespository.delete(ingredient);
    }
}
