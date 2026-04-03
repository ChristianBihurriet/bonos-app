import { API_URL, fetchConAuth } from "./api.js";
import { renderBonos } from "./ui.js";

export async function cargarBonos() {
    const data = await fetchConAuth(`${API_URL}/bonos`);
    renderBonos(data);
}

export async function crearBono() {
    const servicio = document.querySelector('#servicio').value;
    const comprador = document.querySelector('#comprador').value;
    const precio = document.querySelector('#precio').value;
    const fechaCompra = document.querySelector('#fechaCompra').value;
    const fechaVencimiento = document.querySelector('#fechaVencimiento').value;
    const estado = document.querySelector('#estado').value;

    if (!servicio || !comprador || !precio || !fechaCompra || !fechaVencimiento || !estado) {
        document.querySelector('#resultado').innerText = "Completa todos los campos";
        return;
    }

    await fetchConAuth(`${API_URL}/bonos`, {
        method: "POST",
        body: JSON.stringify({
            servicio,
            comprador,
            precio,
            fechaCompra,
            fechaVencimiento,
            estado
        })
    });

    cargarBonos();
}


export async function actualizarBono(id) {
    const servicio = document.querySelector('#servicio').value;

    await fetchConAuth(`${API_URL}/bonos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ servicio })
    });

    cargarBonos();
}

function handleAccion(id, accion) {
    if (accion === "eliminar") eliminarBono(id);
    if (accion === "usar") marcarComoUsado(id);
}

export async function eliminarBono(id) {
    await fetchConAuth(`${API_URL}/bonos/${id}`, {
        method: "DELETE"
    });

    cargarBonos();
}

export async function marcarComoUsado(id) {
    await fetchConAuth(`${API_URL}/bonos/${id}/usar`, {
        method: "PATCH"
    });

    cargarBonos();
}