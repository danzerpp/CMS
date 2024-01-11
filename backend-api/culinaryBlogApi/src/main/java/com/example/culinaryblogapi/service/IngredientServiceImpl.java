package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.repository.IngredientRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientRespository ingredientRespository;

    @Override
    public void deleteRecipeById(long recipeId) {
        ingredientRespository.deleteById(recipeId);
    }
}
