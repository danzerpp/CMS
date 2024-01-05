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
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "category_id")
    private long  categoryId;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by_user_id", referencedColumnName = "id")
    //@Column(name = "created_by_user_id")
    private User createdByUserId;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "edited_by_user_id", referencedColumnName = "id")
    //@Column(name = "edited_by_user_id")
    private User editedByUserId;

    @Column(name = "edited_date")
    private LocalDateTime editedDate;

    @Column(name = "is_visible")
    private int isVisible;

}
