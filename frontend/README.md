# 🎟️ Bonos App - Frontend

Frontend de la aplicación **Bonos App**, una interfaz web desarrollada con JavaScript y Bootstrap que consume una API REST construida con Spring Boot.

Permite gestionar bonos de forma sencilla: autenticación, creación, edición, eliminación y búsqueda por ID.

---

## 🚀 Tecnologías utilizadas

* **JavaScript (ES Modules)**
* **Vite**
* **Bootstrap 5**
* **Fetch API**
* **HTML5 / CSS3**

---

## 📦 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/ChristianBihurriet/bonos-app.git

# Entrar al frontend
cd bonos-app/frontend

# Instalar dependencias
npm install

# Ejecutar entorno de desarrollo
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## 🔐 Autenticación

La aplicación utiliza autenticación basada en **JWT**.

* Login con usuario y contraseña
* El token se almacena en `localStorage`
* Se envía automáticamente en cada request (`Authorization: Bearer ...`)

---

## 📋 Funcionalidades

* ✅ Login de usuario
* ✅ Listado de bonos
* ✅ Crear bono
* ✅ Editar bono
* ✅ Eliminar bono
* ✅ Marcar bono como usado
* ✅ Búsqueda por ID
* ✅ Validación de formularios
* ✅ Manejo de errores de API
* ✅ UI responsive con Bootstrap

---

## 🧠 Arquitectura

El frontend está organizado en módulos:

```
src/
├── main.js        # Punto de entrada
├── api.js         # Cliente HTTP con autenticación
├── auth.js        # Login / Logout
├── bonos.js       # Lógica de negocio (CRUD)
└── ui.js          # Renderizado de vistas
```

---

## ⚠️ Notas técnicas

* Manejo de respuestas vacías del backend (ej: DELETE → 204 No Content)
* Separación clara entre lógica de negocio y UI
* Uso de `async/await` para manejo de asincronía
* Validaciones tanto en frontend como en inputs HTML

---

## 🔍 Búsqueda de bonos

Permite buscar un bono por ID:

* Input numérico sin valores negativos
* Soporte para tecla **Enter**
* Botón de reset para volver al listado completo

---

## 🎨 UI

* Diseño limpio con Bootstrap
* Formularios consistentes (crear / editar)
* Tabla interactiva con acciones por bono
* Feedback visual de estado (badges)

---

## 📌 Próximas mejoras

* 🔄 Paginación de resultados
* 🔍 Filtros por estado
* 🔔 Notificaciones (toasts)
* ⚡ Optimistic UI (sin recargar tabla)
* 🧾 Exportación a PDF

---

## 👨‍💻 Autor

**Christian Bihurriet**
Desarrollador Backend (Java + Spring Boot)

---

## 📄 Licencia

Este proyecto forma parte de un portfolio personal.
