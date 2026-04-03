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