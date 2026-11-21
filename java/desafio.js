"use strict";

/* ==========================================
   MODO DESAFÍOS - CICLO DEL CARBONO
   ========================================== */

/* VALORES INICIALES */

const INITIAL = {
  factory: 10,
  car: 20,
  tree: 40,
  housing: 10,
  energy: 8,
  deforestation: 5,
  wetland: 8,
  cattle: 20,
  algae: 40,
  beach: 3,
  sea: 3
};

const INITIAL_CO2 = 2000;
const INITIAL_TEMPERATURE = 0.50;

/* VARIABLES Y CONTRIBUCIONES */

const PARAMETERS = [
  {
    id: "factory",
    label: "🏭 Fábricas",
    min: 0, max: 20,
    emitted: 100, absorbed: 0
  },
  {
    id: "car",
    label: "🚗 Autos",
    min: 0, max: 50,
    emitted: 1, absorbed: 0
  },
  {
    id: "tree",
    label: "🌳 Plantas / árboles",
    min: 0, max: 100,
    emitted: 10, absorbed: 15
  },
  {
    id: "housing",
    label: "🏠 Viviendas (miles)",
    min: 0, max: 20,
    emitted: 50, absorbed: 0
  },
  {
    id: "energy",
    label: "⚡ Energía fósil",
    min: 0, max: 20,
    emitted: 80, absorbed: 0
  },
  {
    id: "deforestation",
    label: "🌲 Deforestación",
    min: 0, max: 20,
    emitted: 100, absorbed: 0
  },
  {
    id: "wetland",
    label: "🌾 Humedales",
    min: 0, max: 20,
    emitted: 0, absorbed: 25
  },
  {
    id: "cattle",
    label: "🐄 Ganado",
    min: 0, max: 50,
    emitted: 8, absorbed: 0
  },
  {
    id: "algae",
    label: "🌿 Algas",
    min: 0, max: 100,
    emitted: 4, absorbed: 12
  },
  {
    id: "beach",
    label: "Materia en descomposición en playa",
    min: 0, max: 10,
    emitted: 12, absorbed: 0
  },
  {
    id: "sea",
    label: "Materia en descomposición en mar",
    min: 0, max: 10,
    emitted: 15, absorbed: 0
  }
];

/* ==========================================
   LOS CINCO DESAFÍOS
   ========================================== */

const CHALLENGES = [

  /* DESAFÍO 1 */

  {
    title: "Una ciudad en expansión",
    difficulty: "Fácil",

    situation:
      "La población de la ciudad aumentó y fue necesario " +
      "construir más viviendas y edificios. Esto genera " +
      "un mayor consumo de energía y aumenta la " +
      "circulación de vehículos.",

    solutions: [
      {
        letter: "A",
        name: "Aumentar la vegetación",
        changes: {
          tree: 10,
          wetland: 2,
          car: -5
        }
      },
      {
        letter: "B",
        name: "Aprovechar los ecosistemas marinos",
        changes: {
          algae: 10,
          wetland: 1,
          car: -2
        }
      },
      {
        letter: "C",
        name: "Reducir las emisiones industriales",
        changes: {
          factory: -1,
          energy: -1,
          wetland: 1
        }
      },
      {
        letter: "D",
        name: "Combinar diferentes ecosistemas",
        changes: {
          tree: 5,
          algae: 5,
          wetland: 1
        }
      }
    ]
  },

  /* DESAFÍO 2 */

  {
    title: "Nueva planta de extracción",
    difficulty: "Intermedia",

    situation:
      "Se instaló una nueva planta de extracción " +
      "de combustibles fósiles. Esto incrementa " +
      "la producción y el consumo de energía fósil, " +
      "generando un aumento de las emisiones de CO₂.",

    solutions: [
      {
        letter: "A",
        name: "Reducir emisiones y reforzar humedales",
        changes: {
          factory: -1,
          wetland: 2,
          algae: 1,
          car: -2
        }
      },
      {
        letter: "B",
        name: "Fortalecer la vegetación",
        changes: {
          tree: 10,
          algae: 10,
          cattle: -1
        }
      },
      {
        letter: "C",
        name: "Aumentar la absorción natural",
        changes: {
          wetland: 2,
          algae: 10,
          car: -2
        }
      },
      {
        letter: "D",
        name: "Disminuir el uso de energía fósil",
        changes: {
          energy: -2,
          tree: 5,
          algae: 10
        }
      }
    ]
  },

  /* DESAFÍO 3 */

  {
    title: "Un nuevo polo industrial",
    difficulty: "Difícil",

    situation:
      "Se construyó un nuevo polo industrial que " +
      "genera más emisiones. Además, la ciudad ya " +
      "no dispone de terrenos libres para aumentar " +
      "la superficie de bosques.",

    special:
      "Condición especial: no se permite aumentar " +
      "la cantidad de árboles. La solución B permite " +
      "aumentar 19 algas como excepción al límite " +
      "habitual del 10%.",

    solutions: [
      {
        letter: "A",
        name: "Reducir energía fósil y reforzar algas",
        changes: {
          energy: -2,
          algae: 5
        }
      },
      {
        letter: "B",
        name: "Compensar con ecosistemas acuáticos",
        changes: {
          wetland: 2,
          algae: 19
        }
      },
      {
        letter: "C",
        name: "Reducir industria y ampliar ecosistemas",
        changes: {
          factory: -1,
          wetland: 2,
          algae: 7
        }
      },
      {
        letter: "D",
        name: "Combinar energía y algas",
        changes: {
          algae: 10,
          energy: -2
        }
      }
    ]
  },

  /* DESAFÍO 4 */

  {
    title: "El ecosistema costero en peligro",
    difficulty: "Difícil",

    situation:
      "Aumentó la acumulación de materia orgánica " +
      "en descomposición tanto en la playa como " +
      "en el mar. Este proceso libera CO₂ y altera " +
      "el equilibrio del ecosistema.",

    special:
      "Excepción: la solución C permite reducir " +
      "7 autos, por encima del límite habitual " +
      "de modificación del 10%.",

    solutions: [
      {
        letter: "A",
        name: "Reforzar las algas y reducir el tránsito",
        changes: {
          algae: 3,
          car: -3
        }
      },
      {
        letter: "B",
        name: "Fortalecer humedales y algas",
        changes: {
          wetland: 1,
          algae: 1,
          car: -4
        }
      },
      {
        letter: "C",
        name: "Aumentar árboles y reducir autos",
        changes: {
          tree: 4,
          car: -7
        }
      },
      {
        letter: "D",
        name: "Reducir emisiones ganaderas",
        changes: {
          cattle: -1,
          tree: 1
        }
      }
    ]
  },

  /* DESAFÍO 5 */

  {
    title: "La expansión ganadera",
    difficulty: "Experto",

    situation:
      "Aumentó la actividad ganadera y se talaron " +
      "sectores del bosque para ampliar las áreas " +
      "destinadas a la producción. Esto genera " +
      "nuevas emisiones y reduce la capacidad " +
      "natural de absorción de CO₂.",

    solutions: [
      {
        letter: "A",
        name: "Reducir la actividad industrial",
        changes: {
          factory: -2,
          algae: 5
        }
      },
      {
        letter: "B",
        name: "Recuperar ecosistemas y reducir ganado",
        changes: {
          wetland: 2,
          tree: 5,
          cattle: -1
        }
      },
      {
        letter: "C",
        name: "Reducir industria y energía fósil",
        changes: {
          factory: -1,
          energy: -1,
          algae: 5
        }
      },
      {
        letter: "D",
        name: "Combinar bosques, algas y transporte",
        changes: {
          tree: 10,
          algae: 5,
          car: -5
        }
      }
    ]
  }
];

/* ==========================================
   ELEMENTOS HTML Y ESTADO DEL JUEGO
   ========================================== */

const $ = id => document.getElementById(id);

const ui = {
  intro: $("introScreen"),
  game: $("gameScreen"),
  result: $("resultScreen"),
  final: $("finalScreen"),

  number: $("challengeNumber"),
  difficulty: $("difficulty"),
  title: $("challengeTitle"),
  situation: $("challengeSituation"),
  special: $("specialRule"),
  progress: $("progressBar"),

  controls: $("controls"),
  alert: $("ruleAlert"),
  check: $("checkChallenge"),

  co2: $("co2Value"),
  temp: $("temperatureValue"),
  emitted: $("emittedValue"),
  absorbed: $("absorbedValue"),
  status: $("statusMessage"),

  resultIcon: $("resultIcon"),
  resultTitle: $("resultTitle"),
  resultText: $("resultText"),
  resultCO2: $("resultCO2"),
  resultTemp: $("resultTemperature"),

  retry: $("retryButton"),
  next: $("continueButton"),

  failureSolutions: $("failureSolutions"),
  choices: $("solutionChoices"),
  detail: $("solutionDetail"),
  previewHost: $("previewSceneHost")
};

let challengeIndex = 0;
let values = { ...INITIAL };
let finished = false;
let previewing = false;
let cattleDead = false;

const environmentPanel =
  document.querySelector(".environment-panel");

const originalSceneParent =
  environmentPanel.parentElement;

/* ==========================================
   CÁLCULOS
   ========================================== */

function totals(state) {
  let emitted = 0;
  let absorbed = 0;

  for (const p of PARAMETERS) {
    emitted += state[p.id] * p.emitted;
    absorbed += state[p.id] * p.absorbed;
  }

  return {
    emitted,
    absorbed,
    net: emitted - absorbed
  };
}

const baselineNet = totals(INITIAL).net;

function co2For(state) {
  return Math.round(
    INITIAL_CO2 + totals(state).net - baselineNet
  );
}

function tempFor(co2) {
  return Math.max(
    0,
    Math.min(3, (co2 - 1000) / 2000)
  );
}

function tempText(temp) {
  const sign = temp >= 0 ? "+" : "";

  return (
    sign +
    temp.toFixed(2).replace(".", ",") +
    " °C"
  );
}

function clamp(value, minimum, maximum) {
  return Math.max(
    minimum,
    Math.min(maximum, value)
  );
}

/* ==========================================
   LÍMITES DE MODIFICACIÓN
   ========================================== */

function limitsFor(parameter) {
  const amount = Math.floor(
    (parameter.max - parameter.min) * 0.10
  );

  let min = Math.max(
    parameter.min,
    INITIAL[parameter.id] - amount
  );

  let max = Math.min(
    parameter.max,
    INITIAL[parameter.id] + amount
  );

  // DESAFÍO 3: no aumentar árboles.
  if (
    challengeIndex === 2 &&
    parameter.id === "tree"
  ) {
    max = INITIAL.tree;
  }

  // DESAFÍO 3: excepción de 19 algas.
  if (
    challengeIndex === 2 &&
    parameter.id === "algae"
  ) {
    max = INITIAL.algae + 19;
  }

  // DESAFÍO 4: excepción de 7 autos.
  if (
    challengeIndex === 3 &&
    parameter.id === "car"
  ) {
    min = INITIAL.car - 7;
  }

  return { min, max };
}

/* ==========================================
   VERIFICACIÓN DE REGLAS
   ========================================== */

function ruleErrors() {
  const errors = [];

  for (const p of PARAMETERS) {
    const { min, max } = limitsFor(p);

    if (
      values[p.id] < min ||
      values[p.id] > max
    ) {
      errors.push(
        `${p.label}: valores permitidos ${min} a ${max}.`
      );
    }
  }

  if (
    challengeIndex === 2 &&
    values.tree > INITIAL.tree
  ) {
    errors.push(
      "No se permite aumentar los árboles."
    );
  }

  const co2 = co2For(values);

  if (co2 > INITIAL_CO2 + 600) {
    errors.push(
      "Superaste el límite de 600 unidades " +
      "adicionales de CO₂."
    );
  }

  if (
    tempFor(co2) >
    INITIAL_TEMPERATURE + 0.000001
  ) {
    errors.push(
      "La temperatura no puede superar +0,50 °C."
    );
  }

  return errors;
}

/* ADVERTENCIA VISIBLE */

function alertRules() {
  const errors = ruleErrors();

  ui.alert.classList.toggle(
    "hidden",
    errors.length === 0
  );

  if (errors.length > 0) {
    ui.alert.textContent =
      "⚠️ REGLA INCUMPLIDA: " +
      errors.join(" ");
  } else {
    ui.alert.textContent = "";
  }

  return errors;
}

/* ==========================================
   CREACIÓN DE CONTROLES
   ========================================== */

/* ==========================================
   CONTAMINACIÓN - MODO DESAFÍOS
   ========================================== */

const CHALLENGE_RECOVERY = [
  "tree",
  "wetland",
  "algae",
  "cattle"
];

const CHALLENGE_WARNING_CO2 =
  INITIAL_CO2 + 200;

const CHALLENGE_DEATH_CO2 =
  INITIAL_CO2 + 400;

// Advertencia temporal de recuperación.
let recoveryNotice = "";

/* Comprobar si un elemento está protegido
   por las restricciones ambientales. */

function isRecoveryElement(name) {
  return CHALLENGE_RECOVERY.includes(name);
}

/* Comprobar si puede aumentar una variable.

   Se calcula primero el CO₂ que existe
   antes de intentar aumentar esa variable.
*/

function canIncreaseChallengeElement(
  name,
  proposedValue
) {

  if (!isRecoveryElement(name)) {
    return true;
  }

  // Reducir una variable siempre está permitido
  // por esta restricción ambiental.
  if (proposedValue <= values[name]) {
    return true;
  }

  const currentCO2 = co2For(values);

  if (currentCO2 >= CHALLENGE_WARNING_CO2) {
    return false;
  }

  return true;
}

/* Mostrar advertencia visible. */

function showChallengeRecoveryWarning(name) {

  const parameter = PARAMETERS.find(
    p => p.id === name
  );

  recoveryNotice =
    "El ambiente está demasiado contaminado. " +
    "No podés aumentar " +
    parameter.label +
    " hasta reducir el CO₂ atmosférico.";

  const alert = document.getElementById(
    "ruleAlert"
  );

  if (alert) {
    alert.textContent = "⚠️ " + recoveryNotice;
    alert.classList.remove("hidden");
  }

}

/* Quitar aviso al realizar otro cambio. */

function clearChallengeRecoveryWarning() {
  recoveryNotice = "";
}

/* Muerte real por contaminación extrema.

   No solamente desaparece la imagen:
   también se actualizan los valores que
   se utilizan para calcular el CO₂.
*/

function applyChallengeEnvironmentalDeaths() {

  const currentCO2 = co2For(values);

  if (currentCO2 < CHALLENGE_DEATH_CO2) {
    return false;
  }

  let changed = false;

  for (const name of CHALLENGE_RECOVERY) {

    if (values[name] <= 0) {
      continue;
    }

    values[name] = 0;
    changed = true;

    const slider = document.getElementById(
      `range-${name}`
    );

    const output = document.getElementById(
      `value-${name}`
    );

    if (slider) {
      // Permitir representar cero, aunque el
      // límite normal del desafío sea mayor.
      slider.min = "0";
      slider.value = "0";
    }

    if (output) {
      output.textContent = "0";
    }

  }

  if (changed) {

    recoveryNotice =
      "La contaminación extrema provocó " +
      "la pérdida de árboles, humedales, " +
      "algas y ganado. Sus cantidades " +
      "reales fueron actualizadas a cero.";

  }

  return changed;
}



/* ==========================================
   CREAR LOS CONTROLES DE LOS DESAFÍOS
   ========================================== */

function renderControls() {

  ui.controls.innerHTML = "";

  PARAMETERS.forEach(p => {

    const limit = limitsFor(p);

    const row = document.createElement("div");
    row.className = "control-row";

    row.innerHTML = `
      <div class="control-label">
        <label for="range-${p.id}">
          ${p.label}
        </label>

        <output id="value-${p.id}">
          ${values[p.id]}
        </output>
      </div>

      <input
        id="range-${p.id}"
        type="range"
        min="${limit.min}"
        max="${limit.max}"
        step="1"
        value="${values[p.id]}"
      >

      <div class="range-hint">
        <span>Mín. ${limit.min}</span>
        <span>Máx. ${limit.max}</span>
      </div>
    `;

    ui.controls.appendChild(row);

    const slider = row.querySelector("input");
    const output = row.querySelector("output");

    slider.addEventListener("input", () => {

      if (finished) return;

      const proposedValue = Number(slider.value);

      // Comprobar la contaminación antes de
      // modificar la cantidad real.

      if (!canIncreaseChallengeElement(
        p.id,
        proposedValue
      )) {

        // El aumento se rechaza.
        slider.value = String(values[p.id]);

        output.textContent =
          String(values[p.id]);

        showChallengeRecoveryWarning(p.id);

        // No se modifica el CO₂.
        return;
      }

      // Cambio permitido.
      clearChallengeRecoveryWarning();

      values[p.id] = proposedValue;

      output.textContent =
        String(values[p.id]);

      updateDashboard();

    });

  });

}



/* ==========================================
   PAISAJE Y EFECTOS AMBIENTALES
   ========================================== */

function updateLandscape(co2) {
  const scene = $("challengeScene");
  if (!scene) return;

  const temp = tempFor(co2);

  // Diferencia respecto del escenario inicial.
  const excess = Math.max(
    0,
    co2 - INITIAL_CO2
  );

  // Calentamiento visual.
  const warming = Math.max(
    0,
    temp - INITIAL_TEMPERATURE
  );

  // El paisaje pasa de azul a tonos cálidos.
  const heat = clamp(
    warming * 0.65,
    0,
    0.35
  );

  scene.style.setProperty(
    "--heat",
    heat
  );

  $("sceneAtmosphereCO2").textContent =
    co2.toLocaleString("es-AR");

  const status = $("sceneCO2Status");

  if (co2 <= INITIAL_CO2) {
    status.textContent = "Nivel inicial o reducido";
    status.className = "co2-status";
  } else if (excess <= 250) {
    status.textContent = "Nivel elevado";
    status.className = "co2-status warning";
  } else {
    status.textContent = "Contaminación elevada";
    status.className = "co2-status danger";
  }

  /* OCÉANO */

  const dissolved =
    Math.max(0, (co2 - 300) * 0.25);

  const ph = Math.max(
    7.45,
    8.2 - dissolved * 0.0015
  );

  $("challengeDissolvedCO2").textContent =
    Math.round(dissolved).toLocaleString("es-AR");

  $("challengeOceanPH").textContent =
    ph.toFixed(2);

  const oceanOxygen = Math.max(
    17,
    21 - dissolved * 0.004
  );

  $("challengeOceanOxygen").textContent =
    oceanOxygen.toFixed(1) + "%";

  /* NIVEL DEL MAR */

  const seaLevel = Math.max(
    0,
    temp * 18
  );

  $("challengeSeaLevel").textContent =
    seaLevel.toFixed(1).replace(".", ",") +
    " cm";

  /* INCENDIOS AUTOMÁTICOS */

  const fireIntensity = clamp(
    warming / 0.25,
    0,
    1
  );

  const fire = scene.querySelector(".fire");

  fire.classList.toggle(
    "fire-active",
    fireIntensity > 0.15
  );

  /* DEFORESTACIÓN */

  const deforestation =
    scene.querySelector(".deforestation");

  deforestation.classList.toggle(
    "logs-visible",
    values.deforestation > 0
  );

  /* BOSQUE */

  const forest = scene.querySelector(".forest");

  const forestLoss = clamp(
    excess / 550 +
    Math.max(
      0,
      values.deforestation -
      INITIAL.deforestation
    ) * 0.08,
    0,
    1
  );

  forest.style.opacity =
    String(1 - forestLoss * 0.75);

  forest.style.scale =
    String(1 - forestLoss * 0.20);

  /* DETERIORO MARINO */

  const algae = scene.querySelector(".algae");
  const coral = scene.querySelector(".coral");
  const snails = scene.querySelector(".snails");

  const marineDamage = clamp(
    excess / 550,
    0,
    1
  );

  algae.style.opacity =
    String(1 - marineDamage * 0.7);

  coral.style.opacity =
    String(1 - marineDamage * 0.85);

  snails.style.opacity =
    String(1 - marineDamage * 0.6);

  /* DESAPARICIÓN POR CONTAMINACIÓN */

  const deadByPollution = {
    tree: excess >= 650,
    wetland: excess >= 700,
    algae: excess >= 750,
    coral: excess >= 600,
    snail: excess >= 700
  };

  const map = {
    factory: "factory",
    car: "car",
    tree: "tree",
    housing: "housing",
    energy: "energy",
    deforestation: "deforestation",
    wetland: "wetland",
    cattle: "cattle",
    algae: "algae",
    whaleBeach: "beach",
    whaleSea: "sea"
  };

  scene.querySelectorAll("[data-info]").forEach(
    element => {
      const key = element.dataset.info;
      const variable = map[key];

      const zeroQuantity =
        variable !== undefined &&
        values[variable] === 0;

      const pollutionDeath =
        Boolean(deadByPollution[key]);

      element.classList.toggle(
        "dead",
        zeroQuantity || pollutionDeath
      );
    }
  );

  /* GLACIAR */

  const glacier = $("challengePolarIce");

  const melting = clamp(
    temp / 2.5,
    0,
    1
  );

  glacier.style.setProperty(
    "--melt",
    melting
  );

  // El glaciar no emite ni absorbe CO₂.
  // Tampoco genera partículas.
}
/* ==========================================
   EFECTO DEL CO₂ SOBRE EL GANADO
   ========================================== */

function updateCattleEffect(co2) {
  const scene = $("challengeScene");
  if (!scene) return;

  const cattle = scene.querySelector(".cattle");
  if (!cattle) return;

  // El ganado comienza a desaparecer cuando el CO₂
  // supera las 2250 unidades.
  // Desaparece completamente al llegar a 2600.
  const excess = Math.max(0, co2 - INITIAL_CO2);

  const cattleLoss = clamp(
    (excess - 250) / 350,
    0,
    1
  );

  if (cattleLoss >= 1) {
    cattleDead = true;
  }

  cattle.style.transition = "opacity 1s ease";

  cattle.style.opacity = cattleDead
    ? "0"
    : String(1 - cattleLoss);

  cattle.classList.toggle("dead", cattleDead);

  // Cuando desaparece, el indicador pasa a cero.
  if (cattleDead && values.cattle !== 0) {
    values.cattle = 0;

    const slider = $("range-cattle");
    const output = $("value-cattle");

    if (slider) slider.value = "0";
    if (output) output.textContent = "0";
  }
}

/* ==========================================
   ACTUALIZACIÓN DE INDICADORES
   ========================================== */

function updateDashboard() {

// Aplicar muertes reales antes de calcular
// las emisiones y absorciones.
//
// Durante una vista previa de soluciones
// no se modifican los valores previstos.

  if (!previewing) {
    applyChallengeEnvironmentalDeaths();
  }

  
  const preliminaryCO2 = co2For(values);

  updateCattleEffect(preliminaryCO2);

  const result = totals(values);

  const co2 = co2For(values);
  const temp = tempFor(co2);

  ui.co2.textContent =
    co2.toLocaleString("es-AR");

  ui.temp.textContent =
    tempText(temp);

  ui.emitted.textContent =
    result.emitted.toLocaleString("es-AR");

  ui.absorbed.textContent =
    result.absorbed.toLocaleString("es-AR");

  updateLandscape(co2);

  if (previewing) {
    ui.alert.classList.add("hidden");

    ui.status.className = "status-message";
    ui.status.textContent =
      "Vista previa de la solución seleccionada.";

    return;
  }

  const errors = alertRules();

// Conservar la advertencia ambiental,
// aunque no se haya infringido otra regla.

if (recoveryNotice) {

  const alert = document.getElementById(
    "ruleAlert"
  );

  if (alert) {

    const extraErrors =
      errors.length > 0
        ? " " + errors.join(" ")
        : "";

    alert.textContent =
      "⚠️ " + recoveryNotice + extraErrors;

    alert.classList.remove("hidden");

  }

}





  if (errors.length > 0) {
    ui.status.className = "status-message bad";
    ui.status.textContent =
      "Hay reglas incumplidas. Revisá la advertencia.";
  } else if (co2 < INITIAL_CO2) {
    ui.status.className = "status-message good";
    ui.status.textContent =
      `El CO₂ disminuyó ${INITIAL_CO2 - co2} unidades.`;
  } else {
    ui.status.className = "status-message";
    ui.status.textContent =
      "Modificá las variables para reducir el CO₂.";
  }
}

/* ==========================================
   CARGAR DESAFÍO
   ========================================== */

function renderChallenge() {
  const challenge = CHALLENGES[challengeIndex];

  ui.number.textContent =
    `DESAFÍO ${challengeIndex + 1} DE ${CHALLENGES.length}`;

  ui.difficulty.textContent =
    challenge.difficulty;

  ui.title.textContent =
    challenge.title;

  ui.situation.textContent =
    challenge.situation;

  ui.special.textContent =
    challenge.special || "";

  ui.special.classList.toggle(
    "hidden",
    !challenge.special
  );

  ui.progress.style.width =
    (
      (challengeIndex + 1) /
      CHALLENGES.length * 100
    ) + "%";

  renderControls();
  updateDashboard();
}

/* ==========================================
   COMENZAR / REINICIAR
   ========================================== */


function startChallenge() {

  values = { ...INITIAL };

  cattleDead = false;
  recoveryNotice = "";

  finished = false;
  previewing = false;

  // A partir de acá conservá
  // el resto de la función original.

  originalSceneParent.prepend(environmentPanel);

  ui.previewHost.innerHTML = "";

  ui.result.classList.add("hidden");
  ui.result.classList.remove("failed");

  ui.failureSolutions.classList.add("hidden");

  ui.game.classList.remove("hidden");
  ui.intro.classList.add("hidden");
  ui.final.classList.add("hidden");

  ui.check.disabled = false;

  renderChallenge();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ==========================================
   COMPARAR CON LAS SOLUCIONES
   ========================================== */

function matchesSolution(solution) {
  return PARAMETERS.every(parameter => {
    const expected =
      INITIAL[parameter.id] +
      (solution.changes[parameter.id] || 0);

    return values[parameter.id] === expected;
  });
}

/* ==========================================
   MOSTRAR SOLUCIONES AL PERDER
   ========================================== */

function revealFailureSolutions() {
  ui.failureSolutions.classList.remove("hidden");

  ui.choices.innerHTML = "";

  ui.detail.textContent =
    "Elegí una solución para ver sus cambios " +
    "y observar el resultado en el paisaje.";

  const challenge = CHALLENGES[challengeIndex];

  challenge.solutions.forEach(solution => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent =
      `Solución ${solution.letter}`;

    button.addEventListener("click", () => {
      previewSolution(solution, button);
    });

    ui.choices.appendChild(button);
  });

  // Trasladar el paisaje a la pantalla
  // de soluciones.
  ui.previewHost.appendChild(environmentPanel);
}

/* ==========================================
   VISUALIZAR UNA SOLUCIÓN
   ========================================== */

function previewSolution(solution, button) {
  previewing = true;

  // Cada solución se calcula desde
  // los valores iniciales.
  values = { ...INITIAL };

  for (
    const [id, delta]
    of Object.entries(solution.changes)
  ) {
    values[id] += delta;
  }

  // Resaltar el botón elegido.
  ui.choices.querySelectorAll("button").forEach(
    item => {
      item.classList.toggle(
        "active",
        item === button
      );
    }
  );

  const descriptions = Object.entries(
    solution.changes
  ).map(([id, delta]) => {

    const parameter = PARAMETERS.find(
      p => p.id === id
    );

    const action =
      delta > 0 ? "Aumentar" : "Reducir";

    const quantity = Math.abs(delta);

    // Quitar el emoji del nombre
    // para mostrar instrucciones claras.
    const name = parameter.label.replace(
      /^[^\p{L}\p{N}]+/u,
      ""
    );

    return `
      <li>
        ${action} ${quantity} — ${name}
      </li>
    `;
  }).join("");

  const co2 = co2For(values);
  const temp = tempFor(co2);

  ui.detail.innerHTML = `
    <strong>
      Solución ${solution.letter}:
      ${solution.name}
    </strong>

    <ul>
      ${descriptions}
    </ul>

    <p>
      <strong>CO₂ resultante:</strong>
      ${co2.toLocaleString("es-AR")} unidades
    </p>

    <p>
      <strong>Temperatura:</strong>
      ${tempText(temp)}
    </p>

    <p>
      <strong>Reducción del CO₂:</strong>
      ${INITIAL_CO2 - co2} unidades
    </p>
  `;

  // Actualizar el paisaje con la
  // solución seleccionada.
  updateDashboard();
}

/* ==========================================
   MOSTRAR RESULTADO
   ========================================== */

function showResult(won, message) {
  finished = true;

  const co2 = co2For(values);
  const temp = tempFor(co2);

  ui.resultIcon.textContent =
    won ? "✓" : "!";

  ui.resultTitle.textContent =
    won
      ? "¡Desafío superado!"
      : "Desafío no superado";

  ui.resultText.textContent = message;

  ui.resultCO2.textContent =
    co2.toLocaleString("es-AR") +
    " unidades";

  ui.resultTemp.textContent =
    tempText(temp);

  ui.result.classList.remove("hidden");

  ui.result.classList.toggle(
    "failed",
    !won
  );

  ui.game.classList.add("hidden");

  // Solo permitir avanzar después de ganar.
  ui.next.classList.toggle(
    "hidden",
    !won
  );

  ui.next.textContent =
    challengeIndex === 4
      ? "Finalizar →"
      : "Siguiente desafío →";

  // Las soluciones aparecen
  // únicamente después de perder.
  if (!won) {
    revealFailureSolutions();
  } else {
    ui.failureSolutions.classList.add("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ==========================================
   COMPROBAR DESAFÍO
   ========================================== */

function verifyChallenge() {
  if (finished) return;

  const errors = alertRules();

  // Comprobar primero las reglas.
  if (errors.length > 0) {
    showResult(
      false,
      "Incumpliste una o más reglas: " +
      errors.join(" ")
    );

    return;
  }

  // Buscar coincidencia con alguna
  // de las cuatro soluciones.
  const challenge = CHALLENGES[challengeIndex];

  const matched = challenge.solutions.find(
    matchesSolution
  );

  if (!matched) {
    showResult(
      false,
      "Los cambios realizados no coinciden " +
      "exactamente con ninguna de las cuatro " +
      "soluciones previstas. Podés consultar " +
      "las alternativas debajo."
    );

    return;
  }

  const co2 = co2For(values);
  const temp = tempFor(co2);

  if (
    co2 >= INITIAL_CO2 ||
    temp > INITIAL_TEMPERATURE
  ) {
    showResult(
      false,
      "No se consiguió reducir el CO₂ " +
      "sin aumentar la temperatura."
    );

    return;
  }

  showResult(
    true,
    `Aplicaste correctamente la solución ` +
    `${matched.letter}: ${matched.name}. ` +
    `El CO₂ disminuyó sin aumentar ` +
    `la temperatura.`
  );
}

/* ==========================================
   EVENTOS DE BOTONES
   ========================================== */

// Comenzar.
$("beginGame").addEventListener(
  "click",
  startChallenge
);

// Reiniciar desafío.
$("resetChallenge").addEventListener(
  "click",
  startChallenge
);

// Comprobar.
ui.check.addEventListener(
  "click",
  verifyChallenge
);

// Reintentar después de perder.
ui.retry.addEventListener(
  "click",
  startChallenge
);

// Siguiente desafío.
ui.next.addEventListener("click", () => {

  if (
    challengeIndex ===
    CHALLENGES.length - 1
  ) {
    ui.result.classList.add("hidden");
    ui.final.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } else {
    challengeIndex++;
    startChallenge();
  }
});

// Volver a jugar desde el principio.
$("playAgain").addEventListener(
  "click",
  () => {
    challengeIndex = 0;
    startChallenge();
  }
);


/* ==========================================
   VENTANA PARA CONSULTAR LAS REGLAS
   ========================================== */

const rulesModal = document.getElementById("rulesModal");
const openRules = document.getElementById("openRules");
const closeRules = document.getElementById("closeRules");

let previousFocus = null;

function showRulesModal() {
  previousFocus = document.activeElement;

  rulesModal.classList.remove("hidden");

  closeRules.focus();
}

function hideRulesModal() {
  rulesModal.classList.add("hidden");

  if (previousFocus) {
    previousFocus.focus();
  }
}

// Abrir reglas.
openRules.addEventListener("click", showRulesModal);

// Cerrar con el botón.
closeRules.addEventListener("click", hideRulesModal);

// Cerrar haciendo clic fuera de la ventana.
rulesModal.addEventListener("click", event => {
  if (event.target === rulesModal) {
    hideRulesModal();
  }
});

// Cerrar con la tecla Escape.
document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    !rulesModal.classList.contains("hidden")
  ) {
    hideRulesModal();
  }
});