package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User addUser(User user);
    User removeUser(User user);
    Optional<User> findUserById(long userId);

    User save(User user);

    List<User> getAll();
}
