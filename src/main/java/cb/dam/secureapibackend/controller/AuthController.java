package cb.dam.secureapibackend.controller;

import cb.dam.secureapibackend.dto.LoginRequest;
import cb.dam.secureapibackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody LoginRequest signUpRequest) {
        return ResponseEntity.ok(authService.register(signUpRequest));
    }
}
