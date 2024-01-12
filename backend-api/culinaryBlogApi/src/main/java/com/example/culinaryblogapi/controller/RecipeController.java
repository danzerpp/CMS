package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.config.JwtService;
import com.example.culinaryblogapi.dto.IngredientDto;
import com.example.culinaryblogapi.dto.RecipeDto;
import com.example.culinaryblogapi.model.Ingredient;
import com.example.culinaryblogapi.model.Recipe;
import com.example.culinaryblogapi.model.User;
import com.example.culinaryblogapi.requestBody.ImageRequestBody;
import com.example.culinaryblogapi.requestBody.RecipeByTitleAndCategoryIdRequest;
import com.example.culinaryblogapi.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/recipes")
@RequiredArgsConstructor
public class RecipeController {

    @Autowired
    private HttpServletRequest request;

    @Value("${image.folder}")
    private String UPLOAD_PATH;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UnitService unitService;

    @Autowired
    private ProductService productService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private UserService userService;

    private final UserDetailsService userDetailsService;

    private final JwtService jwtService;

    @PostMapping("/add")
    public ResponseEntity<Recipe> add (
            @RequestBody RecipeDto recipeDTO
    ) {
        List<IngredientDto> ingredientDtos = recipeDTO.getIngredients();
        List<Ingredient> ingredientList = new ArrayList<>();

        var recipe = Recipe.builder()
                .categoryId(recipeDTO.getCategoryId())
                .calories(recipeDTO.getCalories())
                .description(recipeDTO.getDescription())
                .ordinalNr(recipeDTO.getOrdinalNr())
                .isVisible(recipeDTO.getIsVisible())
                .createdByUserId(userService.findUserById(recipeDTO.getActionUserId()).orElseThrow())
                .title(recipeDTO.getTitle())
                .build();

        Recipe recipe1 = recipeService.addRecipe(recipe);

        convertFromDtoAndSave(recipe1, ingredientDtos, ingredientList);

        return ResponseEntity.ok(recipe1);
    }

    @PostMapping(value = "/uploadImage")
    public ResponseEntity<?> uploadImage (
            @ModelAttribute ImageRequestBody imageRequestBody
    ) {
        String fileName = UUID.randomUUID() + "." + imageRequestBody.getRecipeImage().getOriginalFilename();
        try {
            File file = new File(UPLOAD_PATH);
            String absolutePath = file.getAbsolutePath();
            imageRequestBody.getRecipeImage().transferTo(new File(absolutePath + "/" + fileName));
            Recipe recipe = recipeService.findRecipeById(imageRequestBody.getRecipeId()).orElseThrow();
            recipe.setPathToImage(fileName);
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
        if(recipeService.findRecipeById(recipeId).isPresent()){
            Recipe recipe = recipeService.findRecipeById(recipeId).get();
            for(Ingredient i : ingredientService.findAllByRecipe(recipe)){
                ingredientService.delete(i);
            }
            return ResponseEntity.ok(recipeService.deleteRecipeById(recipeId));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Recipe with id: " + recipeId + " not found");
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> edit (
             @RequestBody RecipeDto recipeDTO
    ) {
        Recipe recipe = recipeService.findRecipeById(recipeDTO.getRecipeId()).orElseThrow();

        for(Ingredient ingredient : ingredientService.findAllByRecipe(recipe)){
            ingredientService.delete(ingredient);
        }

        List<IngredientDto> ingredientDtos = recipeDTO.getIngredients();
        List<Ingredient> ingredientList = new ArrayList<>();

        convertFromDtoAndSave(recipe, ingredientDtos, ingredientList);

        recipe.setIngredients(ingredientList);
        recipe.setCalories(recipeDTO.getCalories());
        recipe.setTitle(recipeDTO.getTitle());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setEditedByUserId(userService.findUserById(recipeDTO.getActionUserId()).orElseThrow());
        recipe.setEditedDate(LocalDateTime.now());
        recipe.setCategoryId(recipeDTO.getCategoryId());
        recipe.setIsVisible(recipeDTO.getIsVisible());
        recipe.setOrdinalNr(recipeDTO.getOrdinalNr());
        return ResponseEntity.ok(recipeService.save(recipe));
    }

    private void convertFromDtoAndSave(Recipe recipe, List<IngredientDto> ingredientDtos, List<Ingredient> ingredientList) {
        for(IngredientDto i : ingredientDtos){
            Ingredient ingredient = new Ingredient();
            ingredient.setQuantity(i.getQuantity());
            ingredient.setUnit(unitService.findUnitById(i.getUnitId()));
            ingredient.setOrdinalNr(i.getOrdinalNr());
            ingredient.setProduct(productService.findProductById(i.getProductId()));
            ingredient.setRecipe(recipe);
            ingredientList.add(ingredient);
            ingredientService.save(ingredient);
        }
    }

    @PostMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RecipeDto>> getAllRecipes (
            @RequestBody RecipeByTitleAndCategoryIdRequest recipeByTitleAndCategoryIdRequest
    ) throws IOException {
        List<Recipe> recipes;
        final String authHeader = request.getHeader("Authorization");
        String jwt = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        UserDetails details = userDetailsService.loadUserByUsername(userEmail);
        User user = userService.findUserByEmail(details.getUsername()).get(0);
        boolean isAdminRequest = false;
        if (details != null && details.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            isAdminRequest = true;
        }

        if(recipeByTitleAndCategoryIdRequest.getTitle() == null){
            recipes = isAdminRequest ? recipeService.getAllByCategoryId(recipeByTitleAndCategoryIdRequest.getCategoryId())
                    : recipeService.findAllByCreatedByUserIdAndCategoryId(user, recipeByTitleAndCategoryIdRequest.getCategoryId());
        } else {
            recipes = isAdminRequest ? recipeService.findAllByTitleContainingIgnoreCaseAndCategoryId(recipeByTitleAndCategoryIdRequest.getTitle(), recipeByTitleAndCategoryIdRequest.getCategoryId())
                                        : recipeService.findAllByTitleContainingIgnoreCaseAndCreatedByUserIdAndCategoryId(recipeByTitleAndCategoryIdRequest.getTitle(), user, recipeByTitleAndCategoryIdRequest.getCategoryId());
        }

        return ResponseEntity.ok(convertRecipeToDTO(recipes.stream().filter(r -> r.getIsVisible() == 1).collect(Collectors.toList())));
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<?> getAllRecipesByRecipeId(@PathVariable long recipeId) throws IOException {
        if(recipeService.findRecipeById(recipeId).isPresent()){
            return ResponseEntity.ok(recipeService.findRecipeById(recipeId).get());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Recipe with id: " + recipeId + " not found");
        }
    }

    public List<RecipeDto> convertRecipeToDTO(List<Recipe> recipes) throws IOException {
        List<RecipeDto> recipeDtos = new ArrayList<>();
        File fileTmp = new File(UPLOAD_PATH);
        String absolutePath = fileTmp.getAbsolutePath();
        for (Recipe recipe : recipes) {
            String base64Image;
            if(recipe.getPathToImage() != null && !recipe.getPathToImage().isEmpty()){
                File file = new File(absolutePath + "/" + recipe.getPathToImage());
                FileInputStream fileInputStream = new FileInputStream(file);
                byte[] bytes = new byte[(int) file.length()];
                fileInputStream.read(bytes);
                fileInputStream.close();

                base64Image = Base64.getEncoder().encodeToString(bytes);
            } else {
                base64Image = "";
            }
            List<Ingredient> ingredients = ingredientService.findAllByRecipe(recipe);
            List<IngredientDto> ingredientsDtos = new ArrayList<>();
            for(Ingredient i : ingredients){
                IngredientDto ingredientDto = new IngredientDto();
                ingredientDto.setOrdinalNr(i.getOrdinalNr());
                ingredientDto.setQuantity(i.getQuantity());
                ingredientDto.setProductId(i.getProduct().getId());
                ingredientDto.setUnitId(i.getUnit().getId());
                ingredientsDtos.add(ingredientDto);
            }

            RecipeDto recipeDTO = RecipeDto.builder()
                    .recipeId(recipe.getId())
                    .categoryId(recipe.getCategoryId())
                    .ordinalNr(recipe.getOrdinalNr())
                    .title(recipe.getTitle())
                    .description(recipe.getDescription())
                    .calories(recipe.getCalories())
                    .isVisible(recipe.getIsVisible())
                    .ingredients(ingredientsDtos)
                    .image(base64Image)
                    .build();

            if(recipe.getIsVisible() == 1){
                recipeDtos.add(recipeDTO);
            }
        }
        return recipeDtos;
    }

}
