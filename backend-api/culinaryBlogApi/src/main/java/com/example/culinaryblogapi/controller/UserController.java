package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.model.User;
import com.example.culinaryblogapi.service.RoleService;
import com.example.culinaryblogapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @PostMapping("/add")
    public ResponseEntity<User> add (
            @RequestBody User user
    ) {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @PutMapping("/remove/{userId}")
    public ResponseEntity<User> remove (
            @PathVariable long userId
    ) {
        User user = userService.findUserById(userId).orElseThrow(NoSuchElementException::new);
        user.setIsDeleted(1);
        return ResponseEntity.ok(userService.removeUser(user));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> edit (
            @PathVariable("id") User targetUser,  @RequestBody User sourceUser
    ) {
        sourceUser.setRole(roleService.findByName(sourceUser.getRole().getName()).orElseThrow());
        BeanUtils.copyProperties(sourceUser, targetUser, "id", "password");
        return ResponseEntity.ok(userService.save(targetUser));
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers () {
        return ResponseEntity.ok(userService.getAll());
    }

}
