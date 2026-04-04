-- Usuario (password: 123456 encriptado con BCrypt)
INSERT INTO users (username, password)
VALUES ('christian', '$2a$10$yGusUlTvoiBLIvYgHx2JguDf5CJGH7yycnTO0TUJIus40dOdyThge');

-- Roles
INSERT INTO user_roles (user_id, roles)
SELECT id, 'ROLE_USER' FROM users WHERE username = 'christian';

-- Bonos
INSERT INTO bonos (servicio, comprador, precio, fecha_compra, fecha_vencimiento, estado, created_by)

SELECT 'Radiofrecuencia', 'Maria', 120.00, DATE '2026-03-01', DATE '2026-06-01', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Limpieza facial', 'Ana', 60.00, DATE '2026-03-05', DATE '2026-06-05', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Masaje relajante', 'Luis', 80.00, DATE '2026-03-07', DATE '2026-06-07', 'USADO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Peeling químico', 'Carla', 95.00, DATE '2026-03-10', DATE '2026-06-10', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Tratamiento antiacné', 'Jorge', 110.00, DATE '2026-03-12', DATE '2026-06-12', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Radiofrecuencia', 'Lucia', 130.00, DATE '2026-03-15', DATE '2026-06-15', 'VENCIDO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Masaje descontracturante', 'Pedro', 90.00, DATE '2026-03-17', DATE '2026-06-17', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Limpieza facial', 'Sofia', 65.00, DATE '2026-03-18', DATE '2026-06-18', 'USADO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Tratamiento capilar', 'Miguel', 150.00, DATE '2026-03-20', DATE '2026-06-20', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Peeling químico', 'Laura', 100.00, DATE '2026-03-22', DATE '2026-06-22', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Radiofrecuencia', 'Diego', 125.00, DATE '2026-03-25', DATE '2026-06-25', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Masaje relajante', 'Elena', 85.00, DATE '2026-03-27', DATE '2026-06-27', 'VENCIDO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Limpieza facial', 'Raul', 70.00, DATE '2026-03-28', DATE '2026-06-28', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Tratamiento antiacné', 'Paula', 115.00, DATE '2026-03-29', DATE '2026-06-29', 'ACTIVO', id FROM users WHERE username='christian'
UNION ALL
SELECT 'Radiofrecuencia', 'Andres', 140.00, DATE '2026-03-30', DATE '2026-06-30', 'USADO', id FROM users WHERE username='christian';