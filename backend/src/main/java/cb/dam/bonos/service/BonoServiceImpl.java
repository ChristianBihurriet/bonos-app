package cb.dam.bonos.service;

import cb.dam.bonos.dto.BonoRequestDTO;
import cb.dam.bonos.dto.BonoResponseDTO;
import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.BonoEstado;
import cb.dam.bonos.model.User;
import cb.dam.bonos.repository.BonoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BonoServiceImpl implements BonoService{

    private final BonoRepository bonoRepository;

    @Override
    public BonoResponseDTO crearBono(BonoRequestDTO dto, User user) {
        Bono bono = Bono.builder()
                .numeroBono(resolveNumeroBonoParaCrear(dto))
                .servicio(dto.getServicio())
                .comprador(dto.getComprador())
                .beneficiario(dto.getBeneficiario())
                .precio(dto.getPrecio())
                .fechaCompra(resolveFechaCompra(dto))
                .fechaVencimiento(resolveFechaVencimiento(dto))
                .formaPago(dto.getFormaPago())
                .estado(dto.getEstado() != null ? dto.getEstado() : BonoEstado.ACTIVO)
                .observaciones(dto.getObservaciones())
                .creator(user)
                .build();

        Bono saved = bonoRepository.save(bono);
        return mapToDTO(saved);
    }

    @Override
    public List<BonoResponseDTO> obtenerBonos() {

        return bonoRepository.findAll(Sort.by(Sort.Direction.ASC, "numeroBono"))
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public BonoResponseDTO obtenerBonoPorNumeroBono(Integer numeroBono) {
        return mapToDTO(getBonoEntityByNumeroBono(numeroBono));
    }

    @Override
    public List<BonoResponseDTO> obtenerBonosPorUsuario(User user) {

        return bonoRepository.findByCreator(user)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public BonoResponseDTO actualizarBono(Integer numeroBono, BonoRequestDTO dto) {
        Bono bono = getBonoEntityByNumeroBono(numeroBono);

        actualizarNumeroBonoSiCorresponde(bono, dto.getNumeroBono());
        bono.setServicio(dto.getServicio());
        bono.setComprador(dto.getComprador());
        bono.setBeneficiario(dto.getBeneficiario());
        bono.setPrecio(dto.getPrecio());
        bono.setFechaCompra(dto.getFechaCompra());
        bono.setFechaVencimiento(dto.getFechaVencimiento());
        bono.setFormaPago(dto.getFormaPago());
        bono.setEstado(dto.getEstado());
        bono.setObservaciones(dto.getObservaciones());

        return mapToDTO(bonoRepository.save(bono));
    }

    @Override
    public void eliminarBono(Integer numeroBono) {
        bonoRepository.delete(getBonoEntityByNumeroBono(numeroBono));
    }

    public BonoResponseDTO marcarComoUsado(Integer numeroBono) {

        Bono bono = getBonoEntityByNumeroBono(numeroBono);

        if (bono.getEstado() != BonoEstado.ACTIVO) {
            throw new RuntimeException("El bono no se puede usar");
        }

        bono.setEstado(BonoEstado.USADO);

        return mapToDTO(bonoRepository.save(bono));
    }

    private Bono mapToEntity(BonoRequestDTO dto, User user) {
        return Bono.builder()
                .numeroBono(resolveNumeroBonoParaCrear(dto))
                .servicio(dto.getServicio())
                .comprador(dto.getComprador())
                .beneficiario(dto.getBeneficiario())
                .precio(dto.getPrecio())
                .fechaCompra(resolveFechaCompra(dto))
                .fechaVencimiento(resolveFechaVencimiento(dto))
                .formaPago(dto.getFormaPago())
                .estado(dto.getEstado() != null ? dto.getEstado() : BonoEstado.ACTIVO)
                .observaciones(dto.getObservaciones())
                .creator(user)
                .build();
    }

    private BonoResponseDTO mapToDTO(Bono bono) {
        return BonoResponseDTO.builder()
                .numeroBono(bono.getNumeroBono())
                .servicio(bono.getServicio())
                .comprador(bono.getComprador())
                .beneficiario(bono.getBeneficiario())
                .precio(bono.getPrecio())
                .fechaCompra(bono.getFechaCompra())
                .fechaVencimiento(bono.getFechaVencimiento())
                .formaPago(bono.getFormaPago())
                .estado(bono.getEstado())
                .observaciones(bono.getObservaciones())
                .creador(bono.getCreator().getUsername())
                .build();
    }

    private Integer resolveNumeroBonoParaCrear(BonoRequestDTO dto) {
        if (dto.getNumeroBono() == null) {
            return obtenerSiguienteNumeroBono();
        }

        validarNumeroBonoDisponible(dto.getNumeroBono());
        return dto.getNumeroBono();
    }

    public Integer obtenerSiguienteNumeroBono() {
        return bonoRepository.findMaxNumeroBono() + 1;
    }

    private void actualizarNumeroBonoSiCorresponde(Bono bono, Integer numeroBonoSolicitado) {
        if (numeroBonoSolicitado == null || numeroBonoSolicitado.equals(bono.getNumeroBono())) {
            return;
        }

        if (bonoRepository.existsByNumeroBonoAndIdNot(numeroBonoSolicitado, bono.getId())) {
            throw new RuntimeException("Ya existe un bono con el código " + numeroBonoSolicitado);
        }

        bono.setNumeroBono(numeroBonoSolicitado);
    }

    private void validarNumeroBonoDisponible(Integer numeroBono) {
        if (bonoRepository.existsByNumeroBono(numeroBono)) {
            throw new RuntimeException("Ya existe un bono con el código " + numeroBono);
        }
    }

    private LocalDate resolveFechaCompra(BonoRequestDTO dto) {
        return dto.getFechaCompra() != null ? dto.getFechaCompra() : LocalDate.now();
    }

    private LocalDate resolveFechaVencimiento(BonoRequestDTO dto) {
        return dto.getFechaVencimiento() != null
                ? dto.getFechaVencimiento()
                : resolveFechaCompra(dto).plusMonths(6);
    }

    private Bono getBonoEntityByNumeroBono(Integer numeroBono) {
        return bonoRepository.findByNumeroBono(numeroBono)
                .orElseThrow(() -> new RuntimeException("Bono no encontrado"));
    }
}
