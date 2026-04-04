package cb.dam.bonos.service;

import cb.dam.bonos.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {
    User registerUser(User user);
    Optional<User> findByUsername(String username);
}
