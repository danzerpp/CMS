package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.dto.CategoryDto;
import com.example.culinaryblogapi.dto.IngredientDtoForHome;
import com.example.culinaryblogapi.dto.RecipeDtoForHome;
import com.example.culinaryblogapi.model.Category;
import com.example.culinaryblogapi.model.Ingredient;
import com.example.culinaryblogapi.model.Recipe;
import com.example.culinaryblogapi.requestBody.RecipeByTitleAndCategoryIdRequest;
import com.example.culinaryblogapi.service.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UnitService unitService;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${image.folder}")
    private String UPLOAD_PATH;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories () {
        List<Category> categories = categoryService.getAll();
        List<CategoryDto> categoryDtos = categories.stream()
                .map(this::convertToDto)
                .filter(c -> c.getIsVisible() == 1)
                .collect(Collectors.toList());
        return ResponseEntity.ok(categoryDtos);
    }

    @GetMapping(value="/recipes", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RecipeDtoForHome>> getAllRecipes (
            @RequestBody RecipeByTitleAndCategoryIdRequest recipeByTitleAndCategoryIdRequest
    )  throws IOException {
        if(recipeByTitleAndCategoryIdRequest.getTitle() == null){
            List<Recipe> recipes = recipeService.getAllByCategoryId(recipeByTitleAndCategoryIdRequest.getCategoryId());
            List<RecipeDtoForHome> recipeDtoForHome = recipes.stream()
                    .map( n -> {
                        try {
                            return convertToDto(n);
                        } catch (IOException e) {
                            e.printStackTrace();

                        }
                        return null;
                    })
                    .filter(n -> n.getIsVisible() == 1)
                    .toList();
            return ResponseEntity.ok(recipeDtoForHome);
        } else {
            List<Recipe> recipes = recipeService.getAllByCategoryId(recipeByTitleAndCategoryIdRequest.getCategoryId());
            List<RecipeDtoForHome> recipeDtoForHome = recipes.stream()
                    .map( n -> {
                        try {
                            return convertToDto(n);
                        } catch (IOException e) {
                            e.printStackTrace();

                        }
                        return null;
                    })
                    .filter(n -> n.getIsVisible() == 1)
                    .toList();
            return ResponseEntity.ok(recipeDtoForHome);
        }
//
//        return ResponseEntity.ok(convertRecipeToDTO(recipes.stream().filter(r -> r.getIsVisible() == 1).collect(Collectors.toList())));
    }


    private CategoryDto convertToDto(Category category) {
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
        categoryDto.setCreatedByUserId(category.getId());
        return categoryDto;
    }

    private RecipeDtoForHome convertToDto(Recipe recipe) throws IOException {
        RecipeDtoForHome recipeDtoForHome = modelMapper.map(recipe, RecipeDtoForHome.class);
        List<IngredientDtoForHome> ingredientDtoForHomes = new ArrayList<>();

        for(Ingredient i : recipe.getIngredients()) {
            IngredientDtoForHome ingredientDtoForHome = new IngredientDtoForHome();
            ingredientDtoForHome.setProductName(i.getProduct().getName());
            ingredientDtoForHome.setUnitName(i.getUnit().getName());
            ingredientDtoForHome.setQuantity(i.getQuantity());
            ingredientDtoForHome.setOrdinalNr(i.getOrdinalNr());
            ingredientDtoForHomes.add(ingredientDtoForHome);
        }
        recipeDtoForHome.setIngredients(ingredientDtoForHomes);

        File fileTmp = new File(UPLOAD_PATH);
        String absolutePath = fileTmp.getAbsolutePath();

        String base64Image;
        if (!recipe.getPathToImage().isEmpty()) {
            File file = new File(absolutePath + "/" + recipe.getPathToImage());
            FileInputStream fileInputStream = new FileInputStream(file);
            byte[] bytes = new byte[(int) file.length()];
            fileInputStream.read(bytes);
            fileInputStream.close();

            base64Image = Base64.getEncoder().encodeToString(bytes);
        } else {
            base64Image = "";
        }

        recipeDtoForHome.setImage(base64Image);


        return recipeDtoForHome;
    }

}
