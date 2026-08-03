/* ==========================================================================
   Cell # One — main.js
   ========================================================================== */

const WHATSAPP_NUMBER = "584147979192";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initFaqAccordion();
  initContactForm();
  renderPromociones();
  renderCatalogo();
});

/* --------------------------------------------------------------------------
   Header: sombra al hacer scroll
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Menú móvil
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------------
   FAQ acordeón
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Formulario de contacto -> redirige a WhatsApp con el mensaje armado
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const nombre = (data.get("nombre") || "").toString().trim();
    const tipo = (data.get("tipo") || "").toString().trim();
    const telefono = (data.get("telefono") || "").toString().trim();
    const mensaje = (data.get("mensaje") || "").toString().trim();

    const lineas = [
      "Hola Cell # One, quiero información.",
      nombre && `Nombre: ${nombre}`,
      tipo && `Tipo de cliente: ${tipo}`,
      telefono && `Teléfono de contacto: ${telefono}`,
      mensaje && `Mensaje: ${mensaje}`,
    ].filter(Boolean);

    const texto = encodeURIComponent(lineas.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, "_blank", "noopener");
  });
}

/* --------------------------------------------------------------------------
   Promociones y catálogo: renderizado dinámico desde /data/*.json
   -------------------------------------------------------------------------- */
async function loadJson(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`No se pudo cargar ${path}`);
    return await res.json();
  } catch (err) {
    console.warn(err);
    return null;
  }
}

async function renderPromociones() {
  const emptyState = document.querySelector("#promociones-empty");
  const content = document.querySelector("#promociones-content");
  if (!content) return;

  const data = await loadJson("data/promociones.json");
  const hayPersonas = data?.personas?.planes?.length;
  const hayPymes = data?.pymes?.planes?.length;

  if (!hayPersonas && !hayPymes) {
    emptyState?.removeAttribute("hidden");
    content.setAttribute("hidden", "");
    return;
  }
  emptyState?.setAttribute("hidden", "");
  content.removeAttribute("hidden");

  if (hayPersonas) {
    renderPromocionesPersonas(data.personas);
  }
  if (hayPymes) {
    renderPromocionesPymes(data.pymes);
  }
}

function renderPromocionesPersonas(personas) {
  const container = document.querySelector("#promociones-personas");
  if (!container) return;

  const filas = personas.planes
    .map(
      (plan) => `
      <tr class="${plan.recomendado ? "is-recomendado" : ""}">
        <td>${plan.nombre}${plan.recomendado ? ' <span class="promo-badge">Recomendado</span>' : ""}</td>
        <td>${plan.datos}</td>
        <td>${plan.minutos}</td>
        <td>${plan.sms}</td>
        <td>${plan.recarga}</td>
      </tr>`
    )
    .join("");

  container.innerHTML = `
    <h3>Para personas naturales</h3>
    ${personas.notaGeneral ? `<p class="promo-nota">${personas.notaGeneral}</p>` : ""}
    <div class="table-scroll">
      <table class="promo-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Datos</th>
            <th>Minutos</th>
            <th>SMS</th>
            <th>Recarga inicial</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>
    ${
      personas.terminos?.length
        ? `<details class="promo-details">
            <summary>Ver condiciones</summary>
            <ul>${personas.terminos.map((t) => `<li>${t}</li>`).join("")}</ul>
          </details>`
        : ""
    }`;
}

function renderPromocionesPymes(pymes) {
  const container = document.querySelector("#promociones-pymes");
  if (!container) return;

  const tarjetas = pymes.planes
    .map((plan) => {
      const precioBlock = plan.variantes
        ? `<div class="table-scroll">
            <table class="promo-table promo-table-compact">
              <thead>
                <tr><th>Variante</th><th>Datos</th><th>Minutos</th><th>SMS</th><th>Precio</th></tr>
              </thead>
              <tbody>
                ${plan.variantes
                  .map(
                    (v) => `<tr><td>${v.nombre}</td><td>${v.datos}</td><td>${v.minutos}</td><td>${v.sms}</td><td>${v.precio}</td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>`
        : `<p class="promo-resumen">${plan.resumen || ""}</p><p class="promo-precio">${plan.precio || ""}</p>`;

      const terminos = plan.terminos?.length
        ? `<details class="promo-details">
            <summary>Ver condiciones</summary>
            <ul>${plan.terminos.map((t) => `<li>${t}</li>`).join("")}</ul>
          </details>`
        : "";

      return `
        <article class="pyme-plan-card">
          <h4>${plan.nombre}</h4>
          ${plan.slogan ? `<p class="pyme-plan-slogan">${plan.slogan}</p>` : ""}
          ${precioBlock}
          ${terminos}
        </article>`;
    })
    .join("");

  container.innerHTML = `
    <h3>Para PYMES</h3>
    ${pymes.notaGeneral ? `<p class="promo-nota">${pymes.notaGeneral}</p>` : ""}
    <div class="pyme-plans-grid">${tarjetas}</div>`;
}

async function renderCatalogo() {
  const emptyState = document.querySelector("#catalogo-empty");
  const content = document.querySelector("#catalogo-content");
  if (!content) return;

  const data = await loadJson("data/catalogo.json");

  if (!data?.marcas?.length) {
    emptyState?.removeAttribute("hidden");
    content.setAttribute("hidden", "");
    return;
  }
  emptyState?.setAttribute("hidden", "");
  content.removeAttribute("hidden");

  const vigencia = document.querySelector("#catalogo-vigencia");
  if (vigencia && data.vigencia) vigencia.textContent = data.vigencia;

  const condiciones = document.querySelector("#catalogo-condiciones");
  if (condiciones && data.condiciones?.length) {
    condiciones.innerHTML = data.condiciones.map((c) => `<li>${c}</li>`).join("");
  }

  const tabs = document.querySelector("#catalogo-tabs");
  const panels = document.querySelector("#catalogo-panels");
  if (!tabs || !panels) return;

  tabs.innerHTML = data.marcas
    .map(
      (marca, i) =>
        `<button class="catalogo-tab${i === 0 ? " is-active" : ""}" data-marca="${marca.marca}">${marca.marca}</button>`
    )
    .join("");

  panels.innerHTML = data.marcas
    .map(
      (marca, i) => `
      <div class="catalogo-panel${i === 0 ? " is-active" : ""}" data-marca-panel="${marca.marca}">
        <div class="catalogo-grid">
          ${marca.equipos.map(renderEquipoCard).join("")}
        </div>
      </div>`
    )
    .join("");

  tabs.querySelectorAll(".catalogo-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.querySelectorAll(".catalogo-tab").forEach((t) => t.classList.remove("is-active"));
      panels.querySelectorAll(".catalogo-panel").forEach((p) => p.classList.remove("is-active"));
      tab.classList.add("is-active");
      panels.querySelector(`[data-marca-panel="${tab.dataset.marca}"]`)?.classList.add("is-active");
    });
  });
}

function renderEquipoCard(equipo) {
  const imgSrc = equipo.imagen || "assets/catalogo/placeholder.svg";
  const descripcion =
    equipo.categoria === "accesorio" && equipo.descripcion
      ? `<p class="equipo-descripcion">${equipo.descripcion}</p>`
      : "";

  const variantes = equipo.variantes
    .map((v) =>
      v.agotado
        ? `<li class="is-agotado"><span>${v.config}</span><span>Agotado</span></li>`
        : `<li><span>${v.config}</span><span class="equipo-precio">${v.precio}</span></li>`
    )
    .join("");

  return `
    <article class="equipo-card">
      <div class="equipo-imagen">
        <img
          src="${imgSrc}"
          alt="${equipo.modelo}"
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/catalogo/placeholder.svg';"
        />
      </div>
      <h4>${equipo.modelo}</h4>
      ${descripcion}
      <ul class="equipo-variantes">${variantes}</ul>
    </article>`;
}
