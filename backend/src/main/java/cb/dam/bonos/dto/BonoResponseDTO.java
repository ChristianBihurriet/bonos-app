package cb.dam.bonos.dto;

import cb.dam.bonos.model.BonoEstado;
import cb.dam.bonos.model.FormaPago;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class BonoResponseDTO {

    private Integer numeroBono;
    private String servicio;
    private String comprador;
    private String beneficiario;
    private BigDecimal precio;
    private LocalDate fechaCompra;
    private LocalDate fechaVencimiento;
    private FormaPago formaPago;
    private BonoEstado estado;
    private String observaciones;
    private String creador;
}
