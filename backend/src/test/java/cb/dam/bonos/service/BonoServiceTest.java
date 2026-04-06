package cb.dam.bonos.service;

import cb.dam.bonos.dto.BonoRequestDTO;
import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.BonoEstado;
import cb.dam.bonos.model.User;
import cb.dam.bonos.repository.BonoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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
        dto.setPrecio(BigDecimal.valueOf(50));
        dto.setFechaCompra(LocalDate.now());
        dto.setFechaVencimiento(LocalDate.now().plusDays(30));
        dto.setEstado(BonoEstado.ACTIVO);
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
                .servicio("Facial")
                .comprador("Maria")
                .precio(BigDecimal.valueOf(50))
                .fechaCompra(LocalDate.now())
                .fechaVencimiento(LocalDate.now().plusDays(30))
                .estado(BonoEstado.ACTIVO)
                .creator(user)
                .build();
    }

    @Test
    void deberiaCrearBono() {
        User user = crearUser();
        BonoRequestDTO dto = crearDTO();
        Bono bono = crearBono(user);

        when(bonoRepository.save(any(Bono.class))).thenReturn(bono);

        var result = bonoService.crearBono(dto, user);

        assertNotNull(result);
        assertEquals("Facial", result.getServicio());
        assertEquals("admin", result.getCreador());
        verify(bonoRepository).save(any(Bono.class));
    }

    @Test
    void deberiaObtenerTodosLosBonos() {
        User user = crearUser();
        Bono bono = crearBono(user);

        when(bonoRepository.findAll()).thenReturn(List.of(bono));

        var result = bonoService.obtenerBonos();

        assertEquals(1, result.size());
        assertEquals("Facial", result.get(0).getServicio());
        verify(bonoRepository).findAll();
    }

    @Test
    void deberiaObtenerBonoPorId() {
        User user = crearUser();
        Bono bono = crearBono(user);

        when(bonoRepository.findById(1)).thenReturn(Optional.of(bono));

        var result = bonoService.obtenerBonoPorId(1);

        assertEquals("Facial", result.getServicio());
        verify(bonoRepository).findById(1);
    }

    @Test
    void deberiaEliminarBono() {
        User user = crearUser();
        Bono bono = crearBono(user);

        when(bonoRepository.findById(1)).thenReturn(Optional.of(bono));

        bonoService.eliminarBono(1);

        verify(bonoRepository).delete(bono);
    }

    @Test
    void deberiaMarcarComoUsado() {
        User user = crearUser();
        Bono bono = crearBono(user);

        when(bonoRepository.findById(1)).thenReturn(Optional.of(bono));
        when(bonoRepository.save(any(Bono.class))).thenReturn(bono);

        var result = bonoService.marcarComoUsado(1);

        assertEquals(BonoEstado.USADO, result.getEstado());
        verify(bonoRepository).save(bono);
    }

}