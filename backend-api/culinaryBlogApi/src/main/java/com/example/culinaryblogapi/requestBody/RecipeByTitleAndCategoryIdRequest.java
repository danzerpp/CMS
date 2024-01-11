package com.example.culinaryblogapi.requestBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeByTitleAndCategoryIdRequest {
    String title;
    long categoryId;
}
