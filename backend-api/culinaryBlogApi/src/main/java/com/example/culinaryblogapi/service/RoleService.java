package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Role;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(String roleName);
    Optional<Role> findById(long id);
}
