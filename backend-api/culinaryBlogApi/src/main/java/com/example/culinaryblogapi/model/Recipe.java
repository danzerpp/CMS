package com.example.culinaryblogapi.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "category_id")
    private long categoryId;

    @Column(name = "ordinal_no")
    private int ordinalNr;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "calories")
    private int calories;

    @Column(name = "path_to_image")
    private String pathToImage;

    @OneToMany(cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<Ingredient> ingredients;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by_user_id", referencedColumnName = "id")
    private User createdByUserId;

    @Column(name = "created_date")
    @Builder.Default
    private LocalDateTime createdDate = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "edited_by_user_id", referencedColumnName = "id")
    @Builder.Default
    private User editedByUserId = null;

    @Column(name = "edited_date")
    @Builder.Default
    private LocalDateTime editedDate = null;

    @Column(name = "is_visible")
    private int isVisible;

}
