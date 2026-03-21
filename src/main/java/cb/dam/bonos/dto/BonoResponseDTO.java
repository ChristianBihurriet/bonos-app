package cb.dam.bonos.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class BonoResponseDTO {

    private Integer id;
    private String servicio;
    private String comprador;
    private BigDecimal precio;
    private LocalDate fechaCompra;
    private LocalDate fechaVencimiento;
    private String estado;
    private String creador;
}
