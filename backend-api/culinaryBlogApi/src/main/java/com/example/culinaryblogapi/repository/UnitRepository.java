package com.example.culinaryblogapi.repository;

import com.example.culinaryblogapi.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    Unit findUnitById(long unitId);
}
