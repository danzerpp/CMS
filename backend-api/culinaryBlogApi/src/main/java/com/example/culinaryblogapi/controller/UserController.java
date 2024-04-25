package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.dto.UserDto;
import com.example.culinaryblogapi.model.User;
import com.example.culinaryblogapi.requestBody.ChangePasswordRequest;
import com.example.culinaryblogapi.service.RoleService;
import com.example.culinaryblogapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/add")
    public ResponseEntity<?> add (
            @RequestBody UserDto userDto
    ) {
        if(userService.findUserByEmail(userDto.getEmail()).isEmpty()){
            var user = User.builder()
                    .fullName(userDto.getFullName())
                    .email(userDto.getEmail())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .role(roleService.findById(userDto.getRoleId()).orElseThrow())
                    .build();
            return ResponseEntity.ok(userService.save(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email: " + userDto.getEmail() + " already exist!");
        }
    }

    @PutMapping("/remove/{userId}")
    public ResponseEntity<?> remove (
            @PathVariable long userId
    ) {
        if(userService.findUserById(userId).isPresent()){
            User user = userService.findUserById(userId).get();
            user.setIsDeleted(1);
            return ResponseEntity.ok(userService.removeUser(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with id: " + userId + " not found");
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<?> edit (
             @RequestBody UserDto userDto
    ) {
        if(!userService.findUserByEmail(userDto.getEmail()).isEmpty()){
            var user = userService.findUserByEmail(userDto.getEmail()).get(0);
            user.setRole(roleService.findById(userDto.getRoleId()).orElseThrow());
            user.setEmail(userDto.getEmail());
            user.setFullName(userDto.getFullName());
            return ResponseEntity.ok(userService.save(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email: " + userDto.getEmail() + " not found");
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword (
            @RequestBody ChangePasswordRequest changePasswordRequest
            ) {
        if(userService.findUserById(changePasswordRequest.getUserId()).isPresent()){
            var user = userService.findUserById(changePasswordRequest.getUserId()).get();
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
            return ResponseEntity.ok(userService.save(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with id: " + changePasswordRequest.getUserId() + " not found");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById (@PathVariable long userId) {
        if(userService.findUserById(userId).isPresent()){
            return ResponseEntity.ok(userService.findUserById(userId).get());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with id: " + userId + " not found");
        }
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers () {
        return ResponseEntity.ok(userService.getAll()
                .stream()
                .filter(u -> u.getIsDeleted() == 0)
                .collect(Collectors.toList()));
    }

}
