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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
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
    public ResponseEntity<User> remove (
            @PathVariable long userId
    ) {
        User user = userService.findUserById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setIsDeleted(1);
        return ResponseEntity.ok(userService.removeUser(user));
    }

    @PutMapping("/edit/{userId}")
    public ResponseEntity<?> edit (
            @PathVariable long userId, @RequestBody UserDto userDto
    ) {
        if(userService.findUserById(userId).isPresent()){
            var user = userService.findUserById(userId).get();
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user.setRole(roleService.findById(userDto.getRoleId()).orElseThrow());
            user.setEmail(userDto.getEmail());
            user.setFullName(userDto.getFullName());
            user.setIsDeleted(userDto.getIsVisible());
            return ResponseEntity.ok(userService.save(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not exist");
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword (
            @RequestBody ChangePasswordRequest changePasswordRequest
            ) {
        if(userService.findUserById(changePasswordRequest.getUserId()).isPresent()){
            var user = userService.findUserById(changePasswordRequest.getUserId()).get();
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
            return ResponseEntity.ok(userService.save(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not exist");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById (@PathVariable long userId) {
        return ResponseEntity.ok(userService.findUserById(userId).get());
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers () {
        return ResponseEntity.ok(userService.getAll()
                .stream()
                .filter(u -> u.getIsDeleted() == 0)
                .collect(Collectors.toList()));
    }

}
