package cb.dam.bonos.controller;

import cb.dam.bonos.dto.BonoRequestDTO;
import cb.dam.bonos.dto.BonoResponseDTO;
import cb.dam.bonos.model.User;
import cb.dam.bonos.service.BonoServiceImpl;
import cb.dam.bonos.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/{numeroBono}")
    public BonoResponseDTO obtenerBono(@PathVariable Integer numeroBono) {
        return bonoService.obtenerBonoPorNumeroBono(numeroBono);
    }

    @PutMapping("/{numeroBono}")
    public BonoResponseDTO actualizarBono(@PathVariable Integer numeroBono, @RequestBody BonoRequestDTO dto) {
        return bonoService.actualizarBono(numeroBono, dto);
    }

    @DeleteMapping("/{numeroBono}")
    public void eliminarBono(@PathVariable Integer numeroBono) {
        bonoService.eliminarBono(numeroBono);
    }

    @PatchMapping("/{numeroBono}/usar")
    public BonoResponseDTO usarBono(@PathVariable Integer numeroBono) {
        return bonoService.marcarComoUsado(numeroBono);
    }
}
