package cb.dam.bonos.repository;

import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BonoRepository extends JpaRepository<Bono, Integer> {

    List<Bono> findByCreator(User user);

    Optional<Bono> findByNumeroBono(Integer numeroBono);

    boolean existsByNumeroBono(Integer numeroBono);

    boolean existsByNumeroBonoAndIdNot(Integer numeroBono, Integer id);

    @Query("select coalesce(max(b.numeroBono), 0) from Bono b")
    Integer findMaxNumeroBono();

}
