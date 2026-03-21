package cb.dam.bonos.service;

import cb.dam.bonos.dto.BonoRequestDTO;
import cb.dam.bonos.dto.BonoResponseDTO;
import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.BonoEstado;
import cb.dam.bonos.model.User;
import cb.dam.bonos.repository.BonoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BonoServiceImpl implements BonoService{

    private final BonoRepository bonoRepository;

    @Override
    public BonoResponseDTO crearBono(BonoRequestDTO dto, User user) {
        Bono bono = Bono.builder()
                .servicio(dto.getServicio())
                .comprador(dto.getComprador())
                .precio(dto.getPrecio())
                .fechaCompra(dto.getFechaCompra())
                .fechaVencimiento(dto.getFechaVencimiento())
                .estado(BonoEstado.ACTIVO)
                .creator(user)
                .build();

        Bono saved = bonoRepository.save(bono);
        return mapToDTO(saved);
    }

    @Override
    public List<BonoResponseDTO> obtenerBonos() {

        return bonoRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public BonoResponseDTO obtenerBonoPorId(Integer id) {
        return mapToDTO(getBonoEntity(id));
    }

    @Override
    public List<BonoResponseDTO> obtenerBonosPorUsuario(User user) {

        return bonoRepository.findByCreator(user)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public BonoResponseDTO actualizarBono(Integer id, BonoRequestDTO dto) {
        Bono bono = getBonoEntity(id);

        bono.setServicio(dto.getServicio());
        bono.setComprador(dto.getComprador());
        bono.setPrecio(dto.getPrecio());
        bono.setFechaCompra(dto.getFechaCompra());
        bono.setFechaVencimiento(dto.getFechaVencimiento());



        return mapToDTO(bonoRepository.save(bono));
    }

    @Override
    public void eliminarBono(Integer id) {
        bonoRepository.delete(getBonoEntity(id));
    }

    public BonoResponseDTO marcarComoUsado(Integer id) {

        Bono bono = getBonoEntity(id);

        if (bono.getEstado() != BonoEstado.ACTIVO) {
            throw new RuntimeException("El bono no se puede usar");
        }

        bono.setEstado(BonoEstado.USADO);

        return mapToDTO(bonoRepository.save(bono));
    }

    private Bono mapToEntity(BonoRequestDTO dto, User user) {
        return Bono.builder()
                .servicio(dto.getServicio())
                .comprador(dto.getComprador())
                .precio(dto.getPrecio())
                .fechaCompra(dto.getFechaCompra())
                .fechaVencimiento(dto.getFechaVencimiento())
                .estado(BonoEstado.ACTIVO)
                .creator(user)
                .build();
    }

    private BonoResponseDTO mapToDTO(Bono bono) {
        return BonoResponseDTO.builder()
                .id(bono.getId())
                .servicio(bono.getServicio())
                .comprador(bono.getComprador())
                .precio(bono.getPrecio())
                .fechaCompra(bono.getFechaCompra())
                .fechaVencimiento(bono.getFechaVencimiento())
                .estado(bono.getEstado().name())
                .creador(bono.getCreator().getUsername())
                .build();
    }
    private Bono getBonoEntity(Integer id) {
        return bonoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bono no encontrado"));
    }
}
