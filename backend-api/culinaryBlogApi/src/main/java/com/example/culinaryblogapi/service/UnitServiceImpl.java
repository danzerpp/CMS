package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Unit;
import com.example.culinaryblogapi.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitServiceImpl implements UnitService {

    @Autowired
    UnitRepository unitRepository;

    @Override
    public List<Unit> getAll() {
        return unitRepository.findAll();
    }

    @Override
    public Unit findUnitById(long unitId) {
        return unitRepository.findUnitById(unitId);
    }
}
