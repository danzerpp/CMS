package com.example.culinaryblogapi.auth;

import com.example.culinaryblogapi.config.JwtService;
import com.example.culinaryblogapi.model.User;
import com.example.culinaryblogapi.repository.RoleRepository;
import com.example.culinaryblogapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(roleRepository.findByName(request.getRole().toUpperCase()).orElseThrow())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user.getRole(), user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @SuppressWarnings("unchecked")
    public <T> T authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User with email: " + request.getEmail() + " does not exist"));
        if(user.getIsDeleted() == 1){
            return (T) HttpStatus.NOT_FOUND;
        } else {
            var jwtToken = jwtService.generateToken(user.getRole(), user);
            return (T) AuthenticationResponse.builder()
                    .token(jwtToken)
                    .email(user.getEmail())
                    .userId(user.getId())
                    .role(user.getRole().getName())
                    .build();
        }
    }
}
