package cb.dam.bonos.controller;

import cb.dam.bonos.dto.BonoRequestDTO;
import cb.dam.bonos.dto.BonoResponseDTO;
import cb.dam.bonos.model.Bono;
import cb.dam.bonos.model.User;
import cb.dam.bonos.service.BonoService;
import cb.dam.bonos.service.BonoServiceImpl;
import cb.dam.bonos.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.method.P;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/bonos")
@RequiredArgsConstructor
public class BonoController {
    private final BonoServiceImpl bonoService;
    private final UserServiceImpl userService;

    @PostMapping
    public BonoResponseDTO crearBono(@RequestBody BonoRequestDTO dto, Authentication authentication) {

        String username = authentication.getName();

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return bonoService.crearBono(dto, user);
    }

    @GetMapping
    public List<BonoResponseDTO> obtenerBonos() {
        return bonoService.obtenerBonos();
    }

    @GetMapping("/{id}")
    public BonoResponseDTO obtenerBono(@PathVariable Integer id) {
        return bonoService.obtenerBonoPorId(id);
    }

    @PutMapping("/{id}")
    public BonoResponseDTO actualizarBono(@PathVariable Integer id, @RequestBody BonoRequestDTO dto) {
        return bonoService.actualizarBono(id, dto);
    }

    @DeleteMapping("/{id}")
    public void eliminarBono(@PathVariable Integer id) {
        bonoService.eliminarBono(id);
    }

    @PatchMapping("/{id}/usar")
    public BonoResponseDTO usarBono(@PathVariable Integer id) {
        return bonoService.marcarComoUsado(id);
    }
}
