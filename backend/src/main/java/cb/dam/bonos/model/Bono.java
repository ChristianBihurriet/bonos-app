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

    @Column(nullable = false, unique = true)
    private Integer numeroBono;

    private String servicio;

    private String comprador;

    private String beneficiario;

    private BigDecimal precio;

    private LocalDate fechaCompra;

    private LocalDate fechaVencimiento;

    @Enumerated(EnumType.STRING)
    private FormaPago formaPago;

    @Enumerated(EnumType.STRING)
    private BonoEstado estado;

    @Column(length = 1000)
    private String observaciones;

    @ManyToOne
    @JoinColumn(name="created_by")
    private User creator;
}
