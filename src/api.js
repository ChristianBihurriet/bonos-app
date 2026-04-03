import { renderLogin } from "./ui.js";

export const API_URL = "http://localhost:8080/api";

export async function fetchConAuth(url, options = {}) {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No autenticado");

    const response = await fetch(url, {
        ...options,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        renderLogin();
        throw new Error("Sesión expirada");
    }

    if (!response.ok) {
        throw new Error("Error en request");
    }

    return response.json();
}