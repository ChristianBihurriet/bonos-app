package cb.dam.bonos.service;

import cb.dam.bonos.dto.BonoRequestDTO;
import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.BonoEstado;
import cb.dam.bonos.model.FormaPago;
import cb.dam.bonos.model.User;
import cb.dam.bonos.repository.BonoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class BonoServiceImplTest {

    @Mock
    private BonoRepository bonoRepository;

    @InjectMocks
    private BonoServiceImpl bonoService;

    private BonoRequestDTO crearDTO() {
        BonoRequestDTO dto = new BonoRequestDTO();
        dto.setServicio("Facial");
        dto.setComprador("Maria");
        dto.setBeneficiario("Laura");
        dto.setPrecio(BigDecimal.valueOf(50));
        dto.setFechaCompra(LocalDate.now());
        dto.setFechaVencimiento(LocalDate.now().plusDays(30));
        dto.setFormaPago(FormaPago.TARJETA);
        dto.setEstado(BonoEstado.ACTIVO);
        dto.setObservaciones("Sin alergias declaradas");
        return dto;
    }

    private User crearUser() {
        User user = new User();
        user.setUsername("admin");
        return user;
    }

    private Bono crearBono(User user) {
        return Bono.builder()
                .id(1)
                .numeroBono(10)
                .servicio("Facial")
                .comprador("Maria")
                .beneficiario("Laura")
                .precio(BigDecimal.valueOf(50))
                .fechaCompra(LocalDate.now())
                .fechaVencimiento(LocalDate.now().plusDays(30))
                .formaPago(FormaPago.TARJETA)
                .estado(BonoEstado.ACTIVO)
                .observaciones("Sin alergias declaradas")
                .creator(user)
                .build();
    }

    @Test
    void deberiaCrearBono() {
        User user = crearUser();
        BonoRequestDTO dto = crearDTO();
        Bono bono = crearBono(user);

        when(bonoRepository.findMaxNumeroBono()).thenReturn(9);
        when(bonoRepository.save(any(Bono.class))).thenReturn(bono);

        var result = bonoService.crearBono(dto, user);

        assertNotNull(result);
        assertEquals(10, result.getNumeroBono());
        assertEquals("Facial", result.getServicio());
        assertEquals("Laura", result.getBeneficiario());
        assertEquals(FormaPago.TARJETA, result.getFormaPago());
        assertEquals("Sin alergias declaradas", result.getObservaciones());
        assertEquals("admin", result.getCreador());
        verify(bonoRepository).save(any(Bono.class));
    }

    @Test
    void deberiaCrearBonoConNumeroManual() {
        User user = crearUser();
        BonoRequestDTO dto = crearDTO();
        dto.setNumeroBono(150);
        Bono bono = crearBono(user);
        bono.setNumeroBono(150);

        when(bonoRepository.existsByNumeroBono(150)).thenReturn(false);
        when(bonoRepository.save(any(Bono.class))).thenReturn(bono);

        var result = bonoService.crearBono(dto, user);

        assertEquals(150, result.getNumeroBono());
        verify(bonoRepository).existsByNumeroBono(150);
        verify(bonoRepository, never()).findMaxNumeroBono();
    }

    @Test
    void noDeberiaCrearBonoConNumeroManualDuplicado() {
        User user = crearUser();
        BonoRequestDTO dto = crearDTO();
        dto.setNumeroBono(150);

        when(bonoRepository.existsByNumeroBono(150)).thenReturn(true);

        RuntimeException error = assertThrows(RuntimeException.class, () -> bonoService.crearBono(dto, user));

        assertEquals("Ya existe un bono con el código 150", error.getMessage());
        verify(bonoRepository, never()).save(any(Bono.class));
    }

    @Test
    void deberiaObtenerTodosLosBonos() {
        User user = crearUser();
        Bono bono = crearBono(user);

        Sort sortByNumeroBono = Sort.by(Sort.Direction.ASC, "numeroBono");
        when(bonoRepository.findAll(sortByNumeroBono)).thenReturn(List.of(bono));

        var result = bonoService.obtenerBonos();

        assertEquals(1, result.size());
        assertEquals("Facial", result.get(0).getServicio());
        verify(bonoRepository).findAll(sortByNumeroBono);
    }

    @Test
    void deberiaObtenerBonoPorNumeroBono() {
        User user = crearUser();
        Bono bono = crearBono(user);

        when(bonoRepository.findByNumeroBono(10)).thenReturn(Optional.of(bono));

        var result = bonoService.obtenerBonoPorNumeroBono(10);

        assertEquals("Facial", result.getServicio());
        verify(bonoRepository).findByNumeroBono(10);
    }

    @Test
    void deberiaEliminarBono() {
        User user = crearUser();
        Bono bono = crearBono(user);

        when(bonoRepository.findByNumeroBono(10)).thenReturn(Optional.of(bono));

        bonoService.eliminarBono(10);

        verify(bonoRepository).delete(bono);
    }

    @Test
    void deberiaMarcarComoUsado() {
        User user = crearUser();
        Bono bono = crearBono(user);

        when(bonoRepository.findByNumeroBono(10)).thenReturn(Optional.of(bono));
        when(bonoRepository.save(any(Bono.class))).thenReturn(bono);

        var result = bonoService.marcarComoUsado(10);

        assertEquals(BonoEstado.USADO, result.getEstado());
        verify(bonoRepository).save(bono);
    }

}
