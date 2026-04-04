import { login, logout } from "./auth.js";
import { fetchConAuth, API_URL } from "./api.js";
import {
  crearBono,
  cargarBonos,
  actualizarBono,
  eliminarBono,
  marcarComoUsado,
  buscarBonoPorId
} from "./bonos.js";

export function renderLogin() {
  document.querySelector('#app').innerHTML = `
    <div class="container vh-100 d-flex flex-column justify-content-center align-items-center">

      <h1 class="fw-bold mb-5 text-center" style="font-size: 3rem;">
        Bienvenido al sistema gestor de bonos
      </h1>

      <form id="loginForm" class="card shadow p-4" style="width: 400px; border-radius: 10px;">

        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input id="username" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input id="password" type="password" class="form-control">
        </div>

        <button type="submit" class="btn btn-dark w-100 mt-2">
          Entrar
        </button>

        <div id="resultado" class="text-danger mt-3 text-center"></div>

      </form>
    </div>
  `;

  document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    login();
  });
}

export function renderBonos(bonos) {
  document.querySelector('#app').innerHTML = `
    <div class="container mt-5">

      <div class="d-flex justify-content-between align-items-center mb-4">
  <h2 class="fw-bold">Sistema de bonos</h2>

  <div class="d-flex gap-2">
    <button id="crearBtn" class="btn btn-dark">Agregar bono</button>
    <button id="logoutBtn" class="btn btn-outline-dark">Logout</button>
  </div>
</div>

      <div class="card shadow-sm p-3">

        <div class="mb-3">
          <form id="buscarForm" class="mb-3 d-flex gap-2">
  <input id="buscarId" type="number" class="form-control w-25" placeholder="Buscar por ID..." />
  <button type="submit" class="btn btn-dark">Buscar</button>
  <button type="button" id="resetBtn" class="btn btn-outline-secondary">Reset</button>
</form>
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

  document.querySelector('#crearBtn').addEventListener('click', renderCrearBono);

  document.querySelector('#logoutBtn').addEventListener('click', logout);

  document.querySelectorAll('.accion-select').forEach(select => {
    select.addEventListener('change', async (e) => {
      const id = e.target.dataset.id;
      const accion = e.target.value;

      if (accion === "editar") renderEditarBono(id);
      if (accion === "usar") await marcarComoUsado(id);
      if (accion === "eliminar") await eliminarBono(id);

      e.target.value = "";
    });
  });

  document.querySelector('#buscarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.querySelector('#buscarId').value;

    if (!id) return;

    if (Number(id) <= 0) {
      alert("El ID debe ser mayor que 0");
      return;
    }

    await buscarBonoPorId(id);
  });

  document.querySelector('#resetBtn').addEventListener('click', cargarBonos);
}

export function renderCrearBono() {
  document.querySelector('#app').innerHTML = `
    <div class="container mt-5">

      <h3 class="text-center mb-4">Crear bono</h3>

      <div class="card shadow-sm p-4 mx-auto" style="max-width: 700px;">

        <div class="mb-3">
          <label class="form-label">Servicio</label>
          <input id="servicio" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Comprador</label>
          <input id="comprador" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Fecha de compra</label>
          <input id="fechaCompra" type="date" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Fecha de vencimiento</label>
          <input id="fechaVencimiento" type="date" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Estado</label>
          <select id="estado" class="form-select">
            <option value="ACTIVO">ACTIVO</option>
            <option value="USADO">USADO</option>
            <option value="VENCIDO">VENCIDO</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label">Monto (€)</label>
          <input id="precio" type="number" class="form-control" />
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button id="volverBtn" class="btn btn-outline-dark">Volver</button>
          <button id="guardarBtn" class="btn btn-dark">Agregar</button>
        </div>

        <div id="resultado" class="text-danger mt-3 text-end"></div>

      </div>
    </div>
  `;

  // defaults
  const hoy = new Date();
  document.querySelector('#fechaCompra').value = hoy.toISOString().split('T')[0];

  const vencimiento = new Date(hoy);
  vencimiento.setMonth(vencimiento.getMonth() + 6);
  document.querySelector('#fechaVencimiento').value = vencimiento.toISOString().split('T')[0];

  document.querySelector('#guardarBtn').addEventListener('click', crearBono);
  document.querySelector('#volverBtn').addEventListener('click', cargarBonos);
}

export async function renderEditarBono(id) {
  const bono = await fetchConAuth(`${API_URL}/bonos/${id}`);

  document.querySelector('#app').innerHTML = `
    <div class="container mt-5">

      <h3 class="text-center mb-4">Editar bono</h3>

      <div class="card shadow-sm p-4 mx-auto" style="max-width: 700px;">

        <div class="mb-3">
          <label class="form-label">Servicio</label>
          <input id="servicio" class="form-control" value="${bono.servicio}" />
        </div>

        <div class="mb-3">
          <label class="form-label">Comprador</label>
          <input id="comprador" class="form-control" value="${bono.comprador}" />
        </div>

        <div class="mb-3">
          <label class="form-label">Fecha de compra</label>
          <input id="fechaCompra" type="date" class="form-control" value="${bono.fechaCompra?.split("T")[0]}" />
        </div>

        <div class="mb-3">
          <label class="form-label">Fecha de vencimiento</label>
          <input id="fechaVencimiento" type="date" class="form-control" value="${bono.fechaVencimiento?.split("T")[0]}" />
        </div>

        <div class="mb-3">
          <label class="form-label">Estado</label>
          <select id="estado" class="form-select">
            <option value="ACTIVO" ${bono.estado === "ACTIVO" ? "selected" : ""}>ACTIVO</option>
            <option value="USADO" ${bono.estado === "USADO" ? "selected" : ""}>USADO</option>
            <option value="VENCIDO" ${bono.estado === "VENCIDO" ? "selected" : ""}>VENCIDO</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label">Monto (€)</label>
          <input id="precio" type="number" class="form-control" value="${bono.precio}" />
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button id="volverBtn" class="btn btn-outline-dark">Volver</button>
          <button id="guardarBtn" class="btn btn-dark">Guardar cambios</button>
        </div>

        <div id="resultado" class="text-danger mt-3 text-end"></div>

      </div>
    </div>
  `;

  document.querySelector('#guardarBtn')
    .addEventListener('click', () => actualizarBono(id));

  document.querySelector('#volverBtn')
    .addEventListener('click', cargarBonos);
}

function getEstadoClass(estado) {
  if (estado === "ACTIVO") return "bg-success";
  if (estado === "USADO") return "bg-secondary";
  if (estado === "VENCIDO") return "bg-danger";
}