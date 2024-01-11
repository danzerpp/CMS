package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.dto.CategoryDto;
import com.example.culinaryblogapi.model.Category;
import com.example.culinaryblogapi.service.CategoryService;
import com.example.culinaryblogapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    private final UserDetailsService userDetailsService;

    @PostMapping("/add")
    public ResponseEntity<Category> add (
            @RequestBody CategoryDto categoryDto
    ) {
        return ResponseEntity.ok(categoryService.addCategory(Category.builder()
                .createdBy(userService.findUserById(categoryDto.getCreatedByUserId()).orElseThrow())
                .name(categoryDto.getName())
                .ordinalNr(categoryDto.getOrdinalNr())
                .isVisible(categoryDto.getIsVisible())
                .createdDate(LocalDateTime.now())
                .build()));
    }

    @DeleteMapping("/remove/{categoryId}")
    public ResponseEntity<?> remove (
            @PathVariable long categoryId
    ) {
        return ResponseEntity.ok(categoryService.deleteCategoryById(categoryId));
    }

    @PutMapping("/edit/{categoryId}")
    public ResponseEntity<?> edit (
            @PathVariable("categoryId") long categoryId, @RequestBody CategoryDto categoryDto
    ) {
        Category category = categoryService.findCategoryById(categoryId);
        category.setName(category.getName());
        category.setOrdinalNr(categoryDto.getOrdinalNr());
        category.setIsVisible(categoryDto.getIsVisible());
        return ResponseEntity.ok(categoryService.save(category));
    }

    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategories () {
        return ResponseEntity.ok(categoryService.getAll());
    }

//    @PostMapping("/changeOrder")
//    public ResponseEntity<Category> changeOrder (
//            @RequestBody Map<Integer, Integer> order
//    ) {
//        List<Category> categories = categoryService.getAll();
//        categories.stream().
//        category.setCreatedBy(userService.findUserById(category.getCreatedBy().getId()).orElseThrow());
//        return ResponseEntity.ok(categoryService.addCategory(category));
//    }
}
