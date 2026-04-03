export function renderLogin() {
    document.querySelector('#app').innerHTML = `
    <h1>Login</h1>
    <input id="username" placeholder="Usuario" />
    <input id="password" type="password" placeholder="Password" />
    <button id="loginBtn">Login</button>
    <div id="resultado"></div>
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
