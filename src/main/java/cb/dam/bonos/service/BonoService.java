package cb.dam.bonos.service;


import cb.dam.bonos.dto.BonoRequestDTO;
import cb.dam.bonos.dto.BonoResponseDTO;
import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BonoService {

    BonoResponseDTO crearBono(BonoRequestDTO dto, User user);

    List<BonoResponseDTO> obtenerBonos();

    BonoResponseDTO obtenerBonoPorId(Integer id);

    BonoResponseDTO actualizarBono(Integer id, BonoRequestDTO dto);

    void eliminarBono(Integer id);

    List<BonoResponseDTO> obtenerBonosPorUsuario(User user);
}
