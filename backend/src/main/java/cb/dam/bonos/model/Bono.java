package cb.dam.bonos.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Builder
@Table(name="bonos")
@NoArgsConstructor
@AllArgsConstructor
public class Bono extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String servicio;

    private String comprador;

    private BigDecimal precio;

    private LocalDate fechaCompra;

    private LocalDate fechaVencimiento;

    @Enumerated(EnumType.STRING)
    private BonoEstado estado;

    @ManyToOne
    @JoinColumn(name="created_by")
    private User creator;
}
