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
    <h1>Sistema de bonos</h1>
    <button id="logoutBtn">Logout</button>

    <table>
      ${bonos.map(b => `
        <tr>
          <td>${b.servicio}</td>
          <td>${b.comprador}</td>
        </tr>
      `).join("")}
    </table>
  `;

    document.querySelector('#logoutBtn').addEventListener('click', logout);
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
