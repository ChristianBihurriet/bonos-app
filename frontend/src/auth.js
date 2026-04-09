import { cargarBonos } from "./bonos.js";
import { API_URL } from "./api.js";
import { renderLogin } from "./ui.js";

export async function login() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (!username || !password) {
        document.querySelector('#resultado').innerText = "Completa los campos";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en login");
        }

        localStorage.setItem("token", data.token);

        cargarBonos();

    } catch (error) {
        document.querySelector('#resultado').innerText = error.message;
    }
}

export function logout() {
    localStorage.removeItem("token");
    renderLogin();
}
