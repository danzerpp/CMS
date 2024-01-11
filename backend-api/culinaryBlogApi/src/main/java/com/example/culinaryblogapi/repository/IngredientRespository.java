package com.example.culinaryblogapi.repository;

import com.example.culinaryblogapi.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRespository extends JpaRepository<Ingredient, Long> {

}
