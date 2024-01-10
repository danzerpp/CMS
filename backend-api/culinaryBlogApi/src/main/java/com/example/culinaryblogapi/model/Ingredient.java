package com.example.culinaryblogapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "recipe_id")
    private long recipeId;

    @Column(name = "product_id")
    private long productId;

    @Column(name = "unit_id")
    private long unitId;

    @Column(name = "quantity")
    private double quantity;

    @Column(name = "ordinal_no")
    private int ordinalNr;
}
