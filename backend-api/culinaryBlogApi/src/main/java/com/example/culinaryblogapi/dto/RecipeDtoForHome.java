package com.example.culinaryblogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDtoForHome {
    long recipeId;
    long categoryId;
    int ordinalNr;
    String title;
    String description;
    int calories;
    long actionUserId;
    int isVisible;
    List<IngredientDto> ingredients;
    MultipartFile recipeImage;
    String image;
}
