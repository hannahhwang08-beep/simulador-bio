"use strict";

/* ============================================
   ESCALADO PROPORCIONAL DEL PAISAJE
   Compatible con simulador y desafíos
   ============================================ */

(() => {

  const viewport =
    document.querySelector(".scene-viewport");

  const scene =
    viewport?.querySelector(".sky");

  if (!viewport || !scene) return;

  // Tamaños de diseño originales.
  const isChallenge =
    scene.id === "challengeScene";

  const baseWidth = isChallenge ? 900 : 1000;
  const baseHeight = 690;

  let pendingFrame = false;

  function ajustarPaisaje() {

    pendingFrame = false;

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;

    // No calcular si está oculto.
    if (width <= 0 || height <= 0) {
      return;
    }

    const scaleX = width / baseWidth;
    const scaleY = height / baseHeight;

    // Mantener las proporciones.
    const scale = Math.min(
      scaleX,
      scaleY,
      1
    );

    const finalWidth = baseWidth * scale;
    const finalHeight = baseHeight * scale;

    // Aplicar escala a toda la escena.
    scene.style.setProperty(
      "--scene-scale",
      String(scale)
    );

    // Centrar el paisaje.
    scene.style.left =
      Math.max(0, (width - finalWidth) / 2) +
      "px";

    scene.style.top =
      Math.max(0, (height - finalHeight) / 2) +
      "px";
  }

  // Evitar cálculos repetidos.
  function solicitarAjuste() {
    if (pendingFrame) return;

    pendingFrame = true;

    requestAnimationFrame(ajustarPaisaje);
  }

  // Detectar cambios en el contenedor.
  const observer = new ResizeObserver(
    solicitarAjuste
  );

  observer.observe(viewport);

  // Detectar cambios de ventana.
  window.addEventListener(
    "resize",
    solicitarAjuste
  );

  // Ajustar después de cargar imágenes.
  window.addEventListener(
    "load",
    solicitarAjuste
  );

  solicitarAjuste();

})();