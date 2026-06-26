import { API_URL, fetchConAuth } from "./api.js";
import { renderBonos } from "./ui.js";

export async function cargarBonos() {
    const data = await fetchConAuth(`${API_URL}/bonos`);
    renderBonos(data || []);
}

export async function crearBono() {
    const servicio = document.querySelector('#servicio').value;
    const comprador = document.querySelector('#comprador').value;
    const beneficiario = document.querySelector('#beneficiario').value;
    const precio = document.querySelector('#precio').value;
    const fechaCompra = document.querySelector('#fechaCompra').value;
    const fechaVencimiento = document.querySelector('#fechaVencimiento').value;
    const formaPago = document.querySelector('#formaPago').value;
    const estado = document.querySelector('#estado').value;
    const observaciones = document.querySelector('#observaciones').value;

    if (!servicio || !comprador || !beneficiario || !precio || !fechaCompra || !fechaVencimiento || !formaPago || !estado) {
        document.querySelector('#resultado').innerText = "Completa todos los campos";
        return;
    }

    await fetchConAuth(`${API_URL}/bonos`, {
        method: "POST",
        body: JSON.stringify({
            servicio,
            comprador,
            beneficiario,
            precio,
            fechaCompra,
            fechaVencimiento,
            formaPago,
            estado,
            observaciones
        })
    });

    cargarBonos();
}


export async function actualizarBono(id) {
    const servicio = document.querySelector('#servicio').value;
    const comprador = document.querySelector('#comprador').value;
    const beneficiario = document.querySelector('#beneficiario').value;
    const precio = document.querySelector('#precio').value;
    const fechaCompra = document.querySelector('#fechaCompra').value;
    const fechaVencimiento = document.querySelector('#fechaVencimiento').value;
    const formaPago = document.querySelector('#formaPago').value;
    const estado = document.querySelector('#estado').value;
    const observaciones = document.querySelector('#observaciones').value;

    await fetchConAuth(`${API_URL}/bonos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            servicio,
            comprador,
            beneficiario,
            precio,
            fechaCompra,
            fechaVencimiento,
            formaPago,
            estado,
            observaciones
        })
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

export async function buscarBonoPorId(id) {
    try {
        const bono = await fetchConAuth(`${API_URL}/bonos/${id}`);

        // renderizamos como lista de 1 elemento
        renderBonos([bono]);

    } catch (error) {
        alert("Bono no encontrado");
    }
}
