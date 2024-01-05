package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.repository.RecipeRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeServiceImpl implements RecipeService{

    @Autowired
    private RecipeRespository recipeRespository;
}
