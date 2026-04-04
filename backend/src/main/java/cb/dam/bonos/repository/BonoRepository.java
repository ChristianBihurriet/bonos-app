package cb.dam.bonos.repository;

import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BonoRepository extends JpaRepository<Bono, Integer> {

    List<Bono> findByCreator(User user);

}