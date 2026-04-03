import { renderLogin } from "./ui.js";
import { cargarBonos } from "./bonos.js";

function init() {
  const token = localStorage.getItem("token");

  if (token) {
    cargarBonos();
  } else {
    renderLogin();
  }
}

init();