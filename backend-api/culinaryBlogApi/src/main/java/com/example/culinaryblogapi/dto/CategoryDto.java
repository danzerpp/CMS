package com.example.culinaryblogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private String name;
    private int ordinalNr;
    private long createdByUserId;
    private int isVisible;
}
