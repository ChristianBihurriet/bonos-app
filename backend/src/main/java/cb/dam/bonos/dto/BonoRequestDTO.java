package cb.dam.bonos.dto;

import cb.dam.bonos.model.BonoEstado;
import cb.dam.bonos.model.FormaPago;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BonoRequestDTO {

    private String servicio;

    private String comprador;

    private String beneficiario;

    @NotNull
    private BigDecimal precio;

    private LocalDate fechaCompra;

    private LocalDate fechaVencimiento;

    @NotNull
    private FormaPago formaPago;

    private BonoEstado estado;

    private String observaciones;

}
