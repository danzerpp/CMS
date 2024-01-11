package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.Role;
import com.example.culinaryblogapi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Optional<Role> findByName(String roleName) {
        return roleRepository.findByName(roleName);
    }

    @Override
    public Optional<Role> findById(long id) {
        return roleRepository.findById(id);
    }
}
