import { API_URL, fetchConAuth } from "./api.js";
import { renderBonos } from "./ui.js";

export async function cargarBonos() {
    const data = await fetchConAuth(`${API_URL}/bonos`);
    renderBonos(data || []);
}

export async function crearBono() {
    const asignarNumeroManual = document.querySelector('#asignarNumeroManual').checked;
    const numeroBono = document.querySelector('#numeroBono').value;
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

    if (asignarNumeroManual && (!numeroBono || Number(numeroBono) <= 0)) {
        document.querySelector('#resultado').innerText = "El código debe ser mayor que 0";
        return;
    }

    try {
        await fetchConAuth(`${API_URL}/bonos`, {
            method: "POST",
            body: JSON.stringify({
                numeroBono: asignarNumeroManual ? Number(numeroBono) : null,
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
    } catch (error) {
        document.querySelector('#resultado').innerText = error.message;
    }
}


export async function actualizarBono(numeroBonoActual) {
    const asignarNumeroManual = document.querySelector('#asignarNumeroManual').checked;
    const numeroBono = document.querySelector('#numeroBono').value;
    const servicio = document.querySelector('#servicio').value;
    const comprador = document.querySelector('#comprador').value;
    const beneficiario = document.querySelector('#beneficiario').value;
    const precio = document.querySelector('#precio').value;
    const fechaCompra = document.querySelector('#fechaCompra').value;
    const fechaVencimiento = document.querySelector('#fechaVencimiento').value;
    const formaPago = document.querySelector('#formaPago').value;
    const estado = document.querySelector('#estado').value;
    const observaciones = document.querySelector('#observaciones').value;

    if (asignarNumeroManual && (!numeroBono || Number(numeroBono) <= 0)) {
        document.querySelector('#resultado').innerText = "El código debe ser mayor que 0";
        return;
    }

    try {
        await fetchConAuth(`${API_URL}/bonos/${numeroBonoActual}`, {
            method: "PUT",
            body: JSON.stringify({
                numeroBono: asignarNumeroManual ? Number(numeroBono) : null,
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
    } catch (error) {
        document.querySelector('#resultado').innerText = error.message;
    }
}

export async function eliminarBono(numeroBono) {
    await fetchConAuth(`${API_URL}/bonos/${numeroBono}`, {
        method: "DELETE"
    });

    cargarBonos();
}

export async function marcarComoUsado(numeroBono) {
    await fetchConAuth(`${API_URL}/bonos/${numeroBono}/usar`, {
        method: "PATCH"
    });

    cargarBonos();
}

export async function buscarBonoPorNumero(numeroBono) {
    try {
        const bono = await fetchConAuth(`${API_URL}/bonos/${numeroBono}`);

        renderBonos([bono]);

    } catch (error) {
        alert("Bono no encontrado");
    }
}
