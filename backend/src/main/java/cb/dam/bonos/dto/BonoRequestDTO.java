package cb.dam.bonos.dto;

import cb.dam.bonos.model.BonoEstado;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BonoRequestDTO {

    @NotBlank
    private String servicio;

    @NotBlank
    private String comprador;

    @NotBlank
    private BigDecimal precio;

    @NotBlank
    private LocalDate fechaCompra;

    @NotBlank
    private LocalDate fechaVencimiento;

    @NotBlank
    private BonoEstado estado;

}
