package com.example.culinaryblogapi.controller;

import com.example.culinaryblogapi.dto.UserDto;
import com.example.culinaryblogapi.model.User;
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
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
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
        var user = userService.findUserById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        //sourceUser.setRole(roleService.findByName(sourceUser.getRole().getName()).orElseThrow());
        //BeanUtils.copyProperties(sourceUser, targetUser, "id", "password");
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(roleService.findById(userDto.getRoleId()).orElseThrow());
        user.setEmail(userDto.getEmail());
        user.setFullName(userDto.getFullName());
        user.setIsDeleted(userDto.getIsVisible());
        return ResponseEntity.ok(userService.save(user));
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers () {
        return ResponseEntity.ok(userService.getAll());
    }

}
