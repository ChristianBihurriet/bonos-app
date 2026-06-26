import { login, logout } from "./auth.js";
import { fetchConAuth, API_URL } from "./api.js";
import {
  crearBono,
  cargarBonos,
  actualizarBono,
  eliminarBono,
  marcarComoUsado,
  buscarBonoPorNumero
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
  <input id="buscarNumeroBono" type="number" class="form-control w-25" placeholder="Buscar por código..." />
  <button type="submit" class="btn btn-dark">Buscar</button>
  <button type="button" id="resetBtn" class="btn btn-outline-secondary">Reset</button>
</form>
        </div>

        <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Código</th>
              <th>Fecha compra</th>
              <th>Vencimiento</th>
              <th>Servicio</th>
              <th>Comprador</th>
              <th>Beneficiario</th>
              <th>Precio</th>
              <th>Forma pago</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            ${bonos.map(b => `
              <tr>
                <td>${b.numeroBono}</td>
                <td>${b.fechaCompra}</td>
                <td>${b.fechaVencimiento}</td>
                <td>${b.servicio}</td>
                <td>${b.comprador}</td>
                <td>${b.beneficiario || ""}</td>
                <td>${b.precio}</td>
                <td>${formatEnum(b.formaPago)}</td>
                <td>
                  <span class="badge ${getEstadoClass(b.estado)}">
                    ${b.estado}
                  </span>
                </td>
                <td class="observaciones-cell">${renderObservaciones(b.observaciones)}</td>
                <td>
                  <select class="form-select form-select-sm accion-select" data-numero-bono="${b.numeroBono}">
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
    </div>
  `;

  document.querySelector('#crearBtn').addEventListener('click', renderCrearBono);

  document.querySelector('#logoutBtn').addEventListener('click', logout);

  document.querySelectorAll('.accion-select').forEach(select => {
    select.addEventListener('change', async (e) => {
      const numeroBono = e.target.dataset.numeroBono;
      const accion = e.target.value;

      if (accion === "editar") renderEditarBono(numeroBono);
      if (accion === "usar") await marcarComoUsado(numeroBono);
      if (accion === "eliminar") await eliminarBono(numeroBono);

      e.target.value = "";
    });
  });

  document.querySelector('#buscarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const numeroBono = document.querySelector('#buscarNumeroBono').value;

    if (!numeroBono) return;

    if (Number(numeroBono) <= 0) {
      alert("El código debe ser mayor que 0");
      return;
    }

    await buscarBonoPorNumero(numeroBono);
  });

  document.querySelector('#resetBtn').addEventListener('click', cargarBonos);
}

export function renderCrearBono() {
  document.querySelector('#app').innerHTML = `
    <div class="container mt-5">

      <h3 class="text-center mb-4">Crear bono</h3>

      <div class="card shadow-sm p-4 mx-auto" style="max-width: 700px;">

        <div class="mb-3">
          <div class="form-check">
            <input id="asignarNumeroManual" type="checkbox" class="form-check-input" />
            <label class="form-check-label" for="asignarNumeroManual">Asignar número manualmente</label>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Código</label>
          <input id="numeroBono" type="number" class="form-control" placeholder="Automático" disabled />
        </div>

        <div class="mb-3">
          <label class="form-label">Servicio</label>
          <input id="servicio" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Comprador</label>
          <input id="comprador" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Beneficiario</label>
          <input id="beneficiario" class="form-control" />
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
          <label class="form-label">Forma de pago</label>
          <select id="formaPago" class="form-select">
            <option value="TARJETA">Tarjeta</option>
            <option value="EFECTIVO">Efectivo</option>
            <option value="BIZUM">Bizum</option>
          </select>
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

        <div class="mb-4">
          <label class="form-label">Observaciones</label>
          <textarea id="observaciones" class="form-control" rows="3"></textarea>
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

  document.querySelector('#asignarNumeroManual').addEventListener('change', (e) => {
    const numeroBonoInput = document.querySelector('#numeroBono');
    numeroBonoInput.disabled = !e.target.checked;
    if (!e.target.checked) numeroBonoInput.value = "";
  });

  document.querySelector('#guardarBtn').addEventListener('click', crearBono);
  document.querySelector('#volverBtn').addEventListener('click', cargarBonos);
}

export async function renderEditarBono(numeroBono) {
  const bono = await fetchConAuth(`${API_URL}/bonos/${numeroBono}`);

  document.querySelector('#app').innerHTML = `
    <div class="container mt-5">

      <h3 class="text-center mb-4">Editar bono</h3>

      <div class="card shadow-sm p-4 mx-auto" style="max-width: 700px;">

        <div class="mb-3">
          <div class="form-check">
            <input id="asignarNumeroManual" type="checkbox" class="form-check-input" />
            <label class="form-check-label" for="asignarNumeroManual">Asignar número manualmente</label>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Código</label>
          <input id="numeroBono" type="number" class="form-control" value="${bono.numeroBono}" disabled />
        </div>

        <div class="mb-3">
          <label class="form-label">Servicio</label>
          <input id="servicio" class="form-control" value="${bono.servicio}" />
        </div>

        <div class="mb-3">
          <label class="form-label">Comprador</label>
          <input id="comprador" class="form-control" value="${bono.comprador}" />
        </div>

        <div class="mb-3">
          <label class="form-label">Beneficiario</label>
          <input id="beneficiario" class="form-control" value="${bono.beneficiario || ""}" />
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
          <label class="form-label">Forma de pago</label>
          <select id="formaPago" class="form-select">
            <option value="TARJETA" ${bono.formaPago === "TARJETA" ? "selected" : ""}>Tarjeta</option>
            <option value="EFECTIVO" ${bono.formaPago === "EFECTIVO" ? "selected" : ""}>Efectivo</option>
            <option value="BIZUM" ${bono.formaPago === "BIZUM" ? "selected" : ""}>Bizum</option>
          </select>
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

        <div class="mb-4">
          <label class="form-label">Observaciones</label>
          <textarea id="observaciones" class="form-control" rows="3">${bono.observaciones || ""}</textarea>
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
    .addEventListener('click', () => actualizarBono(numeroBono));

  document.querySelector('#asignarNumeroManual').addEventListener('change', (e) => {
    document.querySelector('#numeroBono').disabled = !e.target.checked;
  });

  document.querySelector('#volverBtn')
    .addEventListener('click', cargarBonos);
}

function getEstadoClass(estado) {
  if (estado === "ACTIVO") return "bg-success";
  if (estado === "USADO") return "bg-secondary";
  if (estado === "VENCIDO") return "bg-danger";
}

function formatEnum(value) {
  if (!value) return "";
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function renderObservaciones(value) {
  const observaciones = value?.trim();

  if (!observaciones) {
    return '<span class="text-muted">Sin observaciones</span>';
  }

  const text = escapeHtml(observaciones);
  const preview = escapeHtml(truncateText(observaciones, 20));

  return `
    <span class="observaciones-preview" title="${text}">${preview}</span>
  `;
}

function truncateText(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength)}...`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
