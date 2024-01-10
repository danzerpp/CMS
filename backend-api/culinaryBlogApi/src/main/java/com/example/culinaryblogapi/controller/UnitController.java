package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.model.Unit;
import com.example.culinaryblogapi.service.UnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/units")
@RequiredArgsConstructor
public class UnitController {

    @Autowired
    UnitService unitService;

    @GetMapping("")
    public ResponseEntity<List<Unit>> getAllUnits () {
        return ResponseEntity.ok(unitService.getAll());
    }

}
