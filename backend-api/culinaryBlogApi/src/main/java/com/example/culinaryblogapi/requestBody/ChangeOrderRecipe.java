package com.example.culinaryblogapi.requestBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeOrderRecipe {
    long recipeId;
    int ordinalNr;
}
