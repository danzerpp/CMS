package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.model.Recipe;
import com.example.culinaryblogapi.model.User;
import com.example.culinaryblogapi.requestBody.ImageRequestBody;
import com.example.culinaryblogapi.service.RecipeService;
import com.example.culinaryblogapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/admin/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private static final String UPLOAD_PATH = "/Users/apple/Repos/CMS/backend-api/culinaryBlogApi/src/main/resources/static/image/";

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<Recipe> add (
            @RequestBody Recipe recipe
    ) {
        User user = userService.findUserById(recipe.getCreatedByUserId().getId()).orElseThrow();
        recipe.setCreatedByUserId(user);
        return ResponseEntity.ok(recipeService.addRecipe(recipe));
    }

    @PostMapping(value = "/uploadImage", consumes = "application/json")
    public ResponseEntity<?> uploadImage (
            @ModelAttribute ImageRequestBody imageRequestBody
    ) {
        String fileName = imageRequestBody.getRecipeImage().getOriginalFilename();
        try {
            String pathToImage = UPLOAD_PATH + fileName;
            imageRequestBody.getRecipeImage().transferTo(new File(pathToImage));
            Recipe recipe = recipeService.findRecipeById(imageRequestBody.getRecipeId()).orElseThrow();
            recipe.setPathToImage(pathToImage);
            recipeService.save(recipe);
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value ="/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<ByteArrayResource> getImageForRecipe (
            @PathVariable String imageName
    ) throws IOException {
        final ByteArrayResource inputStream = new ByteArrayResource(Files.readAllBytes(Paths.get(
                UPLOAD_PATH + imageName
        )));
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);
    }

    @DeleteMapping("/remove/{recipeId}")
    public ResponseEntity<?> remove (
            @PathVariable long recipeId
    ) {
        return ResponseEntity.ok(recipeService.deleteRecipeById(recipeId));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> edit (
            @PathVariable("id") Recipe targetRecipe, @RequestBody Recipe sourceRecipe
    ) {
        BeanUtils.copyProperties(sourceRecipe, targetRecipe, "id", "password");
        return ResponseEntity.ok(recipeService.save(targetRecipe));
    }

    @GetMapping("")
    public ResponseEntity<List<Recipe>> getAllRecipes () {
        return ResponseEntity.ok(recipeService.getAll());
    }

}
