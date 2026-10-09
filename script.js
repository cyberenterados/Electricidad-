"use strict";

// CONTACTO: reemplazá "" por el número del técnico en formato internacional.
// Solo dígitos, sin +, espacios ni guiones. Para móviles de Argentina: 549 + área + número (sin 0 ni 15).
// Ejemplo de formato ficticio: "54911XXXXXXXX". No uses ese ejemplo como número real.
const WHATSAPP_NUMBER = "";

const contactDialog = document.getElementById("contact-dialog");
const serviceSelect = document.getElementById("service-select");
const messageField = document.getElementById("message");
const whatsappLink = document.getElementById("whatsapp-link");
const feedback = document.getElementById("contact-feedback");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navegacion");

const messages = {
  "Consulta general": "¡Hola! Me gustaría consultar por un trabajo de electricidad a domicilio. Mi zona es: ",
  "Diagnóstico y reparaciones": "¡Hola! Necesito una visita para revisar una falla eléctrica y consultar por su reparación. Mi zona es: ",
  "Instalaciones eléctricas": "¡Hola! Quisiera consultar por una instalación eléctrica (tomas, luminarias, cableado o tablero). Mi zona es: ",
  "Mantenimiento preventivo": "¡Hola! Quisiera coordinar una revisión y mantenimiento preventivo de mi instalación eléctrica. Mi zona es: "
};

function getWhatsAppURL() {
  const phone = WHATSAPP_NUMBER.trim();
  if (!/^[1-9]\d{7,14}$/.test(phone)) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(messageField.value.trim())}`;
}

function updateWhatsAppLink() {
  const url = getWhatsAppURL();
  whatsappLink.href = url || "https://wa.me/";
  feedback.hidden = true;
}

function prepareMessage(service) {
  const selected = Object.hasOwn(messages, service) ? service : "Consulta general";
  serviceSelect.value = selected;
  messageField.value = messages[selected];
  updateWhatsAppLink();
}

function setMenu(open) {
  navigation.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuToggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
}

function openContact(service, trigger) {
  prepareMessage(service);
  setMenu(false);
  if (!contactDialog.open) {
    contactDialog.showModal();
    document.body.classList.add("dialog-open");
  }
  // Los diálogos nativos gestionan Tab, Escape y el retorno del foco.
  contactDialog.dataset.returnFocus = trigger?.id || "";
  serviceSelect.focus();
}

document.querySelectorAll("[data-contact]").forEach(button => {
  button.addEventListener("click", () => openContact(button.dataset.contact, button));
});
document.getElementById("whatsapp-toggle").addEventListener("click", event => {
  openContact("Consulta general", event.currentTarget);
});
document.querySelector(".close-dialog").addEventListener("click", () => contactDialog.close());
contactDialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
contactDialog.addEventListener("click", event => {
  if (event.target !== contactDialog) return;
  const bounds = contactDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) contactDialog.close();
});
serviceSelect.addEventListener("change", () => prepareMessage(serviceSelect.value));
messageField.addEventListener("input", updateWhatsAppLink);
whatsappLink.addEventListener("click", event => {
  if (!getWhatsAppURL()) {
    event.preventDefault();
    feedback.textContent = "El contacto de WhatsApp todavía no está disponible. Intentá nuevamente más tarde.";
    feedback.hidden = false;
    return;
  }
  if (!messageField.value.trim()) {
    event.preventDefault();
    feedback.textContent = "Escribí un mensaje para preparar tu consulta.";
    feedback.hidden = false;
    messageField.focus();
  }
});
menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", event => {
  if (!event.target.closest(".site-header")) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 851px)").addEventListener("change", event => {
  if (event.matches) setMenu(false);
});
document.getElementById("year").textContent = new Date().getFullYear();
prepareMessage("Consulta general");
