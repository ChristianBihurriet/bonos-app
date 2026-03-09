package cb.dam.secureapibackend.service;


import cb.dam.secureapibackend.dto.JwtResponse;
import cb.dam.secureapibackend.dto.LoginRequest;
import cb.dam.secureapibackend.dto.MessageResponse;
import cb.dam.secureapibackend.model.Role;
import cb.dam.secureapibackend.model.User;
import cb.dam.secureapibackend.repository.UserRepository;
import cb.dam.secureapibackend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public JwtResponse login(LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateToken(authentication);

        return new JwtResponse(jwt, loginRequest.getUsername());
    }

    public MessageResponse register(LoginRequest signUpRequest){
        if(userRepository.existsByUsername(signUpRequest.getUsername())){
            throw new RuntimeException("El username ya existe");
        }
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRoles(Set.of(Role.ROLE_USER));

        userRepository.save(user);

        return new MessageResponse("Registrado exitosamente");
    }
}
