package com.example.culinaryblogapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "ordinal_no")
    private int ordinalNr;

    @Column(name = "created_by")
    private long createdBy;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "is_visible")
    private int isVisible;
}
