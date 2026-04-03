import { login, logout } from "./auth.js";
import { crearBono, cargarBonos, actualizarBono } from "./bonos.js";
import { fetchConAuth, API_URL } from "./api.js";

export function renderLogin() {
    document.querySelector('#app').innerHTML = `
    <div class="container vh-100 d-flex flex-column justify-content-center align-items-center">

      <h1 class="fw-bold mb-5 text-center" style="font-size: 3rem;">
        Bienvenido al sistema gestor de bonos
      </h1>

      <div class="card shadow p-4" style="width: 400px; border-radius: 10px;">

        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input id="username" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input id="password" type="password" class="form-control">
        </div>

        <button id="loginBtn" class="btn btn-dark w-100 mt-2">
          Entrar
        </button>

        <div id="resultado" class="text-danger mt-3 text-center"></div>

      </div>
    </div>
  `;

    document.querySelector('#loginBtn').addEventListener('click', login);
}

export function renderBonos(bonos) {
    document.querySelector('#app').innerHTML = `
    <div class="container mt-5">

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Sistema de bonos</h2>
        <button id="logoutBtn" class="btn btn-outline-dark">Logout</button>
      </div>

      <div class="card shadow-sm p-3">

        <div class="mb-3">
          <input class="form-control w-25" placeholder="Buscar..." />
        </div>

        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Servicio</th>
              <th>Comprador</th>
              <th>Fecha compra</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            ${bonos.map(b => `
              <tr>
                <td>${b.id}</td>
                <td>${b.servicio}</td>
                <td>${b.comprador}</td>
                <td>${b.fechaCompra}</td>
                <td>${b.fechaVencimiento}</td>
                <td>
                  <span class="badge ${getEstadoClass(b.estado)}">
                    ${b.estado}
                  </span>
                </td>
                <td>${b.precio}</td>
                <td>
                  <select class="form-select form-select-sm accion-select" data-id="${b.id}">
                    <option value="">Acciones</option>
                    <option value="editar">Editar</option>
                    <option value="usar">Marcar usado</option>
                    <option value="eliminar">Eliminar</option>
                  </select>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>

      </div>
    </div>
  `;

    document.querySelector('#logoutBtn').addEventListener('click', logout);

    document.querySelectorAll('.accion-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const accion = e.target.value;

            if (accion === "editar") renderEditarBono(id);
            if (accion === "usar") marcarComoUsado(id);
            if (accion === "eliminar") eliminarBono(id);
        });
    });
}

export function renderCrearBono() {
    document.querySelector('#app').innerHTML = `
    <h1>Crear Bono</h1>

    <input id="servicio" placeholder="Servicio" />
    <input id="comprador" placeholder="Comprador" />
    <input id="precio" type="number" />

    <button id="guardarBtn">Guardar</button>
    <button id="volverBtn">Volver</button>

    <div id="resultado"></div>
  `;

    document.querySelector('#guardarBtn').addEventListener('click', crearBono);
    document.querySelector('#volverBtn').addEventListener('click', cargarBonos);
}

export async function renderEditarBono(id) {
    const bono = await fetchConAuth(`${API_URL}/bonos/${id}`);

    document.querySelector('#app').innerHTML = `
    <input id="servicio" value="${bono.servicio}" />
    <button id="guardarBtn">Guardar</button>
  `;

    document.querySelector('#guardarBtn')
        .addEventListener('click', () => actualizarBono(id));
}

function getEstadoClass(estado) {
    if (estado === "ACTIVO") return "bg-success";
    if (estado === "USADO") return "bg-secondary";
    if (estado === "VENCIDO") return "bg-danger";
}