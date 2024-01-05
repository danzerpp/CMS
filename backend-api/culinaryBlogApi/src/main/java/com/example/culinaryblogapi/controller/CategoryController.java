package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.model.Category;
import com.example.culinaryblogapi.service.CategoryService;
import com.example.culinaryblogapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<Category> add (
            @RequestBody Category category
    ) {
        category.setCreatedBy(userService.findUserById(category.getCreatedBy().getId()).orElseThrow());
        return ResponseEntity.ok(categoryService.addCategory(category));
    }

    @DeleteMapping("/remove/{categoryId}")
    public ResponseEntity<?> remove (
            @PathVariable long categoryId
    ) {
        return ResponseEntity.ok(categoryService.deleteCategoryById(categoryId));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> edit (
            @PathVariable("id") Category targetCategory,  @RequestBody Category sourceCategory
    ) {
        BeanUtils.copyProperties(sourceCategory, targetCategory, "id", "password");
        return ResponseEntity.ok(categoryService.save(targetCategory));
    }

    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategories () {
        return ResponseEntity.ok(categoryService.getAll());
    }

}
