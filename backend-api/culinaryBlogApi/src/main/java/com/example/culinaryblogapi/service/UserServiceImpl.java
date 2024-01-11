package com.example.culinaryblogapi.service;

import com.example.culinaryblogapi.model.User;
import com.example.culinaryblogapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User removeUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findUserById(long userId) {
        return userRepository.findUserById(userId);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
}
