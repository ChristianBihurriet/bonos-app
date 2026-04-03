import { API_URL, fetchConAuth } from "./api.js";

export async function cargarBonos() {
    const data = await fetchConAuth(`${API_URL}/bonos`);
    renderBonos(data);
}