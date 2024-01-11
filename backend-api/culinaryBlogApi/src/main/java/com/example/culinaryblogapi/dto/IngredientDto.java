package com.example.culinaryblogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngredientDto {
    private String productName;
    private String unitName;
    private double quantity;
    private int ordinalNr;
}
