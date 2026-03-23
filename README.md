# 🎟️ Bonos API

API REST para la gestión de bonos de servicios (ej. estética), con autenticación JWT, validación de datos y arquitectura profesional basada en Spring Boot. 

---
# 🧠 Proyecto de portfolio

Este proyecto ha sido desarrollado como parte de mi portfolio para demostrar competencias en desarrollo backend con Java y Spring Boot, incluyendo seguridad, arquitectura en capas y buenas prácticas.

---

## 🚀 Características

* ✅ CRUD completo de bonos
* ✅ Autenticación y autorización con JWT
* ✅ Validación de datos con Bean Validation
* ✅ Arquitectura en capas (Controller / Service / Repository)
* ✅ Manejo de errores centralizado
* 🔜 Futuro: exportación PDF, filtros, paginación, documentacion con Swagger

---

## 🏗️ Arquitectura

El proyecto sigue el patrón **MVC + Service Layer**:

```text
Controller → Service → Repository → DB
```

* **Controller** → expone endpoints REST
* **Service** → lógica de negocio
* **Repository** → acceso a datos (JPA)
* **Entity / DTO** → modelos de datos

---

## 🔐 Seguridad

Implementación basada en **Spring Security + JWT**:

* Login con usuario/contraseña
* Generación de token JWT
* Filtro de autenticación en cada request
* Endpoints protegidos

---

## 📡 Endpoints principales

### 🔑 Autenticación

```http
POST /auth/login
```

### 🎟️ Bonos

```http
GET    /bonos          → obtener todos
GET    /bonos/{id}     → obtener uno
POST   /bonos          → crear
PUT    /bonos/{id}     → actualizar
DELETE /bonos/{id}     → eliminar
```

---

## 📦 Ejemplo JSON

```json
{
  "servicio": "Radiofrecuencia",
  "comprador": "Maria",
  "precio": 120.00,
  "fechaCompra": "2026-03-20",
  "fechaVencimiento": "2026-06-20",
  "estado": "ACTIVO"
}
```

---

## 🖥️ Tecnologías

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA (Hibernate)
* PostgreSQl
* Maven

---

## ⚙️ Instalación

```bash
git clone https://github.com/ChristianBihurriet/bonos-api.git
cd bonos-api
```

Configurar `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bonos
spring.datasource.username=usuario
spring.datasource.password=password
```

Ejecutar:

```bash
mvn spring-boot:run
```

---

## 🧪 Testing

* Actualmente en desarrollo.  
  Se implementarán tests unitarios con JUnit y Mockito.

---

## 📄 Documentación API

Disponible en:

```
http://localhost:8080/swagger-ui.html
```

---

## 📸 Screenshots

_(Próximamente)_

---

## 📈 Mejoras futuras

* 🔐 Roles y permisos avanzados
* 📄 Exportación a PDF
* 🔍 Filtros y búsqueda
* 📊 Paginación
* ⏰ Tareas programadas (`@Scheduled`) para vencimientos
* 🐳 Dockerización
* 🧪 Testing
* 📄 Swagger

---

## 👨‍💻 Autor

Christian Bihurriet
Backend Developer (Java + Spring Boot)

---

## ⭐ Notas

Este proyecto forma parte de mi portfolio como desarrollador backend, con foco en buenas prácticas, seguridad y arquitectura escalable.
