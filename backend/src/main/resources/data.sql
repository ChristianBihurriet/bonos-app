-- Usuario (password: 123456 encriptado con BCrypt)
INSERT INTO users (username, password)
VALUES ('christian', '$2a$10$yGusUlTvoiBLIvYgHx2JguDf5CJGH7yycnTO0TUJIus40dOdyThge');

-- Roles
INSERT INTO user_roles (user_id, roles)
SELECT id, 'ROLE_USER' FROM users WHERE username = 'christian';

-- Bonos
INSERT INTO bonos (numero_bono, servicio, comprador, beneficiario, precio, fecha_compra, fecha_vencimiento, forma_pago, estado, observaciones, created_by)

SELECT 150, 'Radiofrecuencia', 'Maria', 'Maria', 120.00, DATE '2026-03-01', DATE '2026-09-01', 'TARJETA', 'ACTIVO', 'Primera sesion pendiente', id FROM users WHERE username='christian'
UNION ALL
SELECT 151, 'Limpieza facial', 'Ana', 'Ana', 60.00, DATE '2026-03-05', DATE '2026-09-05', 'EFECTIVO', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 152, 'Masaje relajante', 'Luis', 'Luis', 80.00, DATE '2026-03-07', DATE '2026-09-07', 'BIZUM', 'USADO', 'Canjeado completo', id FROM users WHERE username='christian'
UNION ALL
SELECT 153, 'Peeling químico', 'Carla', 'Carla', 95.00, DATE '2026-03-10', DATE '2026-09-10', 'TARJETA', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 154, 'Tratamiento antiacné', 'Jorge', 'Jorge', 110.00, DATE '2026-03-12', DATE '2026-09-12', 'EFECTIVO', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 155, 'Radiofrecuencia', 'Lucia', 'Lucia', 130.00, DATE '2026-03-15', DATE '2026-09-15', 'BIZUM', 'VENCIDO', 'No utilizado a tiempo', id FROM users WHERE username='christian'
UNION ALL
SELECT 156, 'Masaje descontracturante', 'Pedro', 'Pedro', 90.00, DATE '2026-03-17', DATE '2026-09-17', 'TARJETA', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 157, 'Limpieza facial', 'Sofia', 'Sofia', 65.00, DATE '2026-03-18', DATE '2026-09-18', 'EFECTIVO', 'USADO', 'Usado en abril', id FROM users WHERE username='christian'
UNION ALL
SELECT 158, 'Tratamiento capilar', 'Miguel', 'Miguel', 150.00, DATE '2026-03-20', DATE '2026-09-20', 'BIZUM', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 159, 'Peeling químico', 'Laura', 'Laura', 100.00, DATE '2026-03-22', DATE '2026-09-22', 'TARJETA', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 160, 'Radiofrecuencia', 'Diego', 'Diego', 125.00, DATE '2026-03-25', DATE '2026-09-25', 'EFECTIVO', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 161, 'Masaje relajante', 'Elena', 'Elena', 85.00, DATE '2026-03-27', DATE '2026-09-27', 'BIZUM', 'VENCIDO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 162, 'Limpieza facial', 'Raul', 'Raul', 70.00, DATE '2026-03-28', DATE '2026-09-28', 'TARJETA', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 163, 'Tratamiento antiacné', 'Paula', 'Paula', 115.00, DATE '2026-03-29', DATE '2026-09-29', 'EFECTIVO', 'ACTIVO', '', id FROM users WHERE username='christian'
UNION ALL
SELECT 164, 'Radiofrecuencia', 'Andres', 'Andres', 140.00, DATE '2026-03-30', DATE '2026-09-30', 'BIZUM', 'USADO', 'Regalo', id FROM users WHERE username='christian';
