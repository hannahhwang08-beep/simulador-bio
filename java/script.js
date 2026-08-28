/*
  SIMULADOR DEL CICLO DEL CARBONO
  Unidades de CO₂ = unidades didácticas, no ppm ni toneladas.
*/

const carbonData = {
  factory: {
    name: "Fábrica", icon: "🏭", emitted: 100, absorbed: 0,
    description: "La quema de combustibles fósiles en industrias libera CO₂ a la atmósfera.",
    explanation: "Las fábricas representan una fuente importante de carbono atmosférico."
  },

  car: {
    name: "Auto", icon: "🚗", emitted: 20, absorbed: 0,
    description: "Los vehículos que utilizan combustibles fósiles liberan CO₂ durante la combustión.",
    explanation: "El carbono de la gasolina o el diésel pasa principalmente a la atmósfera como CO₂."
  },

  tree: {
    name: "Planta / árbol", icon: "🌳", emitted: 10, absorbed: 15,
    description: "Las plantas respiran y liberan CO₂, pero mediante la fotosíntesis capturan CO₂.",
    explanation: "En este modelo, cada planta absorbe más CO₂ del que libera, por lo que ayuda a disminuir el CO₂ atmosférico."
  },

  cattle: {
    name: "Ganado", icon: "🐄", emitted: 8, absorbed: 0,
    description: "El ganado forma parte del ciclo del carbono porque devuelve carbono al ambiente mediante distintos procesos.",
    explanation: "Para simplificar, el simulador representa principalmente la emisión de CO₂."
  },

  algae: {
    name: "Algas", icon: "🌿", emitted: 4, absorbed: 12,
    description: "Las algas realizan fotosíntesis y absorben CO₂ disuelto en el agua.",
    explanation: "Si el océano se acidifica demasiado, la cantidad de algas disminuye en este modelo."
  },

  whaleBeach: {
    name: "Ballena muerta en la playa", icon: "🐋", emitted: 12, absorbed: 0,
    description: "Durante la descomposición de una ballena, parte del carbono de sus tejidos vuelve al ambiente.",
    explanation: "La descomposición devuelve carbono al ambiente y puede contribuir a las emisiones."
  },

  whaleSea: {
    name: "Ballena muerta en el océano", icon: "🐋", emitted: 15, absorbed: 0,
    description: "Una ballena muerta en el océano aporta materia orgánica y carbono al ecosistema marino.",
    explanation: "Durante la descomposición, parte del carbono queda en el agua y otra parte puede volver al ambiente."
  },

  coral: {
    name: "Corales", icon: "🪸", emitted: 0, absorbed: 0,
    description: "Los corales forman ecosistemas marinos muy sensibles a cambios en las condiciones del océano.",
    explanation: "En este modelo, cuando el pH baja demasiado, los corales comienzan a morir."
  },

  snail: {
    name: "Caracoles de mar", icon: "🐚", emitted: 0, absorbed: 0,
    description: "Los caracoles marinos poseen estructuras calcáreas que pueden verse afectadas por la acidificación.",
    explanation: "En este modelo, una disminución importante del pH provoca la pérdida de caracoles."
  }
};

const defaultCounts = {
  factory: 2,
  car: 5,
  tree: 10,
  cattle: 5,
  algae: 20,
  whaleBeach: 1,
  whaleSea: 1
};

let counts = { ...defaultCounts };

const inputs = {
  factory: document.getElementById("factoryCount"),
  car: document.getElementById("carCount"),
  tree: document.getElementById("treeCount"),
  cattle: document.getElementById("cattleCount"),
  algae: document.getElementById("algaeCount"),
  whaleBeach: document.getElementById("whaleBeachCount"),
  whaleSea: document.getElementById("whaleSeaCount")
};

const valueLabels = {
  factory: document.getElementById("factoryCountValue"),
  car: document.getElementById("carCountValue"),
  tree: document.getElementById("treeCountValue"),
  cattle: document.getElementById("cattleCountValue"),
  algae: document.getElementById("algaeCountValue"),
  whaleBeach: document.getElementById("whaleBeachCountValue"),
  whaleSea: document.getElementById("whaleSeaCountValue")
};

const totalEmitted = document.getElementById("totalEmitted");
const totalAbsorbed = document.getElementById("totalAbsorbed");
const netBalance = document.getElementById("netBalance");
const atmosphereCO2 = document.getElementById("atmosphereCO2");
const temperature = document.getElementById("temperature");
const oxygen = document.getElementById("oxygen");
const dissolvedCO2 = document.getElementById("dissolvedCO2");
const oceanPH = document.getElementById("oceanPH");
const oceanOxygen = document.getElementById("oceanOxygen");
const co2Status = document.getElementById("co2Status");
const ecosystemMessage = document.getElementById("ecosystemMessage");

const infoPanel = document.getElementById("infoPanel");
const infoIcon = document.getElementById("infoIcon");
const infoTitle = document.getElementById("infoTitle");
const infoDescription = document.getElementById("infoDescription");
const infoStats = document.getElementById("infoStats");
const closeInfo = document.getElementById("closeInfo");


function calculateEmissions() {
  return Object.keys(counts).reduce(
    (total, key) => total + counts[key] * carbonData[key].emitted,
    0
  );
}


function calculateAbsorptions() {
  return Object.keys(counts).reduce(
    (total, key) => total + counts[key] * carbonData[key].absorbed,
    0
  );
}


function calculateAtmosphericCO2() {
  return Math.max(calculateEmissions() - calculateAbsorptions(), 0);
}


function calculateTemperatureIncrease(atmosphericCO2) {
  return Math.floor(atmosphericCO2 / 100);
}


function calculateOcean(atmosphericCO2) {
  const excess = Math.max(atmosphericCO2 - 300, 0);
  const dissolved = excess * 0.35;

  const pH = Math.max(6.8, 8.2 - dissolved / 180);

  const oxygenLoss =
    dissolved * 0.055 +
    Math.max(8.2 - pH, 0) * 4;

  const oceanO2 = Math.max(40, 100 - oxygenLoss);

  return {
    dissolved,
    pH,
    oceanO2
  };
}


function calculateGlobalOxygen(atmosphericCO2, oceanData) {
  const loss = Math.max(0, atmosphericCO2 - 250) * 0.035;
  const oceanEffect =
    Math.max(0, 100 - oceanData.oceanO2) * 0.12;

  return Math.max(45, 100 - loss - oceanEffect);
}


function updateLabels() {
  Object.keys(inputs).forEach(key => {
    valueLabels[key].textContent = counts[key];
  });
}


function updateAtmosphereVisual(atmosphericCO2) {
  const sky = document.querySelector(".sky");

  const intensity = Math.min(
    atmosphericCO2 / 1200,
    0.35
  );

  sky.style.setProperty(
    "--heat",
    intensity.toFixed(3)
  );

  if (atmosphericCO2 < 300) {
    co2Status.textContent = "Nivel estable";
    co2Status.className = "co2-status stable";

  } else if (atmosphericCO2 < 600) {
    co2Status.textContent = "CO₂ elevado";
    co2Status.className = "co2-status warning";

  } else {
    co2Status.textContent = "CO₂ muy elevado";
    co2Status.className = "co2-status danger";
  }
}


function setElementEffects(atmosphericCO2, pH) {
  const forest = document.querySelector(".forest");
  const algae = document.querySelector(".algae");
  const coral = document.querySelector(".coral");
  const snails = document.querySelector(".snails");

  forest.classList.toggle(
    "affected",
    atmosphericCO2 >= 500
  );

  forest.classList.toggle(
    "severe",
    atmosphericCO2 >= 800
  );

  algae.classList.toggle(
    "affected",
    pH <= 7.9
  );

  algae.classList.toggle(
    "severe",
    pH <= 7.5
  );

  coral.classList.toggle(
    "affected",
    pH <= 7.9
  );

  coral.classList.toggle(
    "dead",
    pH <= 7.4
  );

  snails.classList.toggle(
    "affected",
    pH <= 7.8
  );

  snails.classList.toggle(
    "dead",
    pH <= 7.3
  );
}


/* =========================================================
   NUEVO SISTEMA DE RECORRIDO DE MOLÉCULAS DE CO₂
   ========================================================= */

const flowDirections = {
  factory: "emission",
  car: "emission",
  cattle: "emission",
  whaleBeach: "emission",
  whaleSea: "emission",

  tree: "absorption",
  algae: "absorption"
};


/*
  Guarda los intervalos de cada recorrido para poder
  detenerlos cuando sea necesario.
*/
const flowIntervals = {};


/*
  Cantidad de moléculas que aparecen durante un recorrido.
  No representa moléculas reales: es una animación didáctica.
*/
const particlesPerFlow = {
  factory: 8,
  car: 7,
  cattle: 7,
  whaleBeach: 7,
  whaleSea: 7,
  tree: 8,
  algae: 8
};


/*
  Tiempo entre cada molécula.
  De esta forma no aparecen todas juntas.
*/
const particleInterval = 420;


/*
  Duración del viaje de cada molécula.
*/
const particleDuration = 2300;


/*
  Obtiene el centro visual de un elemento.
*/
function getElementCenter(element, container) {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return {
    x:
      elementRect.left +
      elementRect.width / 2 -
      containerRect.left,

    y:
      elementRect.top +
      elementRect.height / 2 -
      containerRect.top
  };
}


/*
  Obtiene el punto central de la caja "ATMÓSFERA".
*/
function getAtmosphereCenter(container) {
  const atmosphere = document.querySelector(
    ".atmosphere-label"
  );

  const atmosphereRect =
    atmosphere.getBoundingClientRect();

  const containerRect =
    container.getBoundingClientRect();

  return {
    x:
      atmosphereRect.left +
      atmosphereRect.width / 2 -
      containerRect.left,

    y:
      atmosphereRect.top +
      atmosphereRect.height / 2 -
      containerRect.top
  };
}


/*
  Crea UNA molécula y la hace viajar desde un punto
  hasta otro.

  Esto es lo que permite que cada punto tenga
  su propio recorrido independiente.
*/
function createCO2Particle(
  container,
  start,
  end,
  type
) {
  const particle = document.createElement("span");

  particle.className =
    "co2-particle " +
    (flowDirections[type] === "absorption"
      ? "green-particle"
      : "red-particle");

  particle.style.left = `${start.x}px`;
  particle.style.top = `${start.y}px`;

  container.appendChild(particle);

  /*
    La animación se realiza con Web Animations API.
    Cada partícula nace, viaja y desaparece
    independientemente.
  */
  const animation = particle.animate(
    [
      {
        left: `${start.x}px`,
        top: `${start.y}px`,
        opacity: 0,
        transform: "translate(-50%, -50%) scale(.55)"
      },

      {
        left: `${start.x}px`,
        top: `${start.y}px`,
        opacity: 1,
        transform: "translate(-50%, -50%) scale(1)",
        offset: 0.08
      },

      {
        left: `${end.x}px`,
        top: `${end.y}px`,
        opacity: 1,
        transform: "translate(-50%, -50%) scale(1)",
        offset: 0.88
      },

      {
        left: `${end.x}px`,
        top: `${end.y}px`,
        opacity: 0,
        transform: "translate(-50%, -50%) scale(.75)"
      }
    ],
    {
      duration: particleDuration,
      easing: "linear",
      fill: "forwards"
    }
  );

  animation.finished
    .then(() => {
      particle.remove();
    })
    .catch(() => {
      particle.remove();
    });
}


/*
  Comienza el recorrido continuo de un elemento.

  EMISIÓN:
    elemento → atmósfera

  ABSORCIÓN:
    atmósfera → elemento
*/
function startCO2Flow(type, sourceElement) {
  if (!flowDirections[type]) {
    return;
  }

  const sky = document.querySelector(".sky");

  if (!sky || !sourceElement) {
    return;
  }

  /*
    Si ya había un recorrido de este mismo elemento,
    lo detenemos antes de empezar otro.
  */
  if (flowIntervals[type]) {
    clearInterval(flowIntervals[type]);
  }

  /*
    Eliminamos las moléculas anteriores de este flujo.
  */
  sky
    .querySelectorAll(
      `.co2-particle[data-flow="${type}"]`
    )
    .forEach(particle => {
      particle.remove();
    });


  /*
    Creamos un pequeño contenedor invisible para
    identificar las partículas de este recorrido.
  */
  const flowContainer = document.createElement("div");

  flowContainer.className = `particle-flow-container flow-container-${type}`;
  flowContainer.dataset.flow = type;

  sky.appendChild(flowContainer);


  /*
    Definimos origen y destino.
  */
  const elementPoint =
    getElementCenter(
      sourceElement,
      sky
    );

  const atmospherePoint =
    getAtmosphereCenter(sky);


  let start;
  let end;

  if (flowDirections[type] === "emission") {

    /*
      ROJO:
      elemento → atmósfera
    */
    start = elementPoint;
    end = atmospherePoint;

  } else {

    /*
      VERDE:
      atmósfera → elemento
    */
    start = atmospherePoint;
    end = elementPoint;
  }


  /*
    Cada cierto tiempo aparece UNA molécula.
    No aparecen todas juntas.
  */
  let created = 0;

  function createNextParticle() {

    if (created >= particlesPerFlow[type]) {
      return;
    }

    const particle =
      document.createElement("span");

    particle.className =
      "co2-particle " +
      (flowDirections[type] === "absorption"
        ? "green-particle"
        : "red-particle");

    particle.dataset.flow = type;

    particle.style.left = `${start.x}px`;
    particle.style.top = `${start.y}px`;

    flowContainer.appendChild(particle);


    /*
      Cada punto viaja desde su origen
      hasta su destino.
    */
    const animation = particle.animate(
      [
        {
          left: `${start.x}px`,
          top: `${start.y}px`,
          opacity: 0,
          transform:
            "translate(-50%, -50%) scale(.55)"
        },

        {
          left: `${start.x}px`,
          top: `${start.y}px`,
          opacity: 1,
          transform:
            "translate(-50%, -50%) scale(1)",
          offset: 0.06
        },

        {
          left: `${end.x}px`,
          top: `${end.y}px`,
          opacity: 1,
          transform:
            "translate(-50%, -50%) scale(1)",
          offset: 0.90
        },

        {
          left: `${end.x}px`,
          top: `${end.y}px`,
          opacity: 0,
          transform:
            "translate(-50%, -50%) scale(.65)"
        }
      ],
      {
        duration: particleDuration,
        easing: "linear",
        fill: "forwards"
      }
    );


    animation.finished
      .then(() => {
        particle.remove();

        /*
          Cuando terminó esta molécula,
          el contenedor queda limpio.
        */
        if (
          flowContainer.children.length === 0 &&
          created >= particlesPerFlow[type]
        ) {
          setTimeout(() => {
            flowContainer.remove();
          }, 50);
        }
      })
      .catch(() => {
        particle.remove();
      });


    created++;
  }


  /*
    Primera molécula inmediatamente.
  */
  createNextParticle();


  /*
    Después aparece una nueva cada cierto tiempo.
  */
  flowIntervals[type] = setInterval(
    createNextParticle,
    particleInterval
  );


  /*
    Cuando ya salieron todas, dejamos de crear nuevas.
  */
  setTimeout(() => {
    clearInterval(flowIntervals[type]);
    delete flowIntervals[type];
  }, particlesPerFlow[type] * particleInterval + 100);
}


/*
  Cuando se hace click en un elemento,
  se inicia su recorrido.
*/
function animateFlow(type, element) {
  startCO2Flow(type, element);
}


/* =========================================================
   FIN DEL SISTEMA DE RECORRIDO
   ========================================================= */


function updateFlows(atmosphericCO2, oceanData) {
  /*
    Esta función se conserva para que el resto del
    simulador siga funcionando normalmente.

    Los recorridos ahora se activan únicamente
    cuando el usuario toca un elemento.
  */
}


function updateSimulation() {
  const emitted = calculateEmissions();
  const absorbed = calculateAbsorptions();
  const atmospheric = calculateAtmosphericCO2();
  const tempIncrease =
    calculateTemperatureIncrease(atmospheric);

  const oceanData =
    calculateOcean(atmospheric);

  const globalO2 =
    calculateGlobalOxygen(
      atmospheric,
      oceanData
    );


  totalEmitted.textContent = emitted;
  totalAbsorbed.textContent = absorbed;
  netBalance.textContent = atmospheric;
  atmosphereCO2.textContent = atmospheric;

  temperature.textContent =
    `+${tempIncrease} °C`;

  oxygen.textContent =
    `${globalO2.toFixed(0)}%`;

  dissolvedCO2.textContent =
    oceanData.dissolved.toFixed(0);

  oceanPH.textContent =
    oceanData.pH.toFixed(2);

  oceanOxygen.textContent =
    `${oceanData.oceanO2.toFixed(0)}%`;


  netBalance.classList.toggle(
    "negative",
    emitted < absorbed
  );

  netBalance.classList.toggle(
    "positive",
    emitted >= absorbed
  );


  if (tempIncrease >= 1) {
    temperature.classList.add(
      "temperature-up"
    );
  } else {
    temperature.classList.remove(
      "temperature-up"
    );
  }


  updateLabels();
  updateAtmosphereVisual(atmospheric);
  setElementEffects(
    atmospheric,
    oceanData.pH
  );

  updateFlows(
    atmospheric,
    oceanData
  );


  const messages = [];


  if (atmospheric >= 500) {
    messages.push(
      "🌳 Los árboles comienzan a disminuir."
    );
  }


  if (globalO2 < 95) {
    messages.push(
      "🫧 El oxígeno disminuye."
    );
  }


  if (oceanData.dissolved > 0) {
    messages.push(
      "🌊 El CO₂ comienza a disolverse en el océano."
    );
  }


  if (oceanData.pH <= 7.9) {
    messages.push(
      "🪸 El pH baja: corales y algas se ven afectados."
    );
  }


  if (oceanData.pH <= 7.5) {
    messages.push(
      "🐚 La acidificación provoca una fuerte disminución de caracoles y corales."
    );
  }


  ecosystemMessage.textContent =
    messages.length
      ? messages.join(" ")
      : "El ecosistema se encuentra en condiciones normales.";


  ecosystemMessage.className =
    "ecosystem-message" +
    (messages.length
      ? " warning-message"
      : "");
}


function showInfo(type) {
  const data = carbonData[type];

  if (!data) {
    return;
  }


  const amount =
    counts[type] ?? 0;

  const emitted =
    amount * data.emitted;

  const absorbed =
    amount * data.absorbed;

  const net =
    emitted - absorbed;


  const atmospheric =
    calculateAtmosphericCO2();

  const oceanData =
    calculateOcean(atmospheric);


  let stateText =
    "Estado normal";


  if (
    type === "tree" &&
    atmospheric >= 500
  ) {
    stateText =
      atmospheric >= 800
        ? "⚠️ Disminución fuerte de árboles"
        : "⚠️ Árboles afectados";
  }


  if (
    type === "algae" &&
    oceanData.pH <= 7.9
  ) {
    stateText =
      oceanData.pH <= 7.5
        ? "⚠️ Disminución fuerte de algas"
        : "⚠️ Algas afectadas por acidificación";
  }


  if (
    type === "coral" &&
    oceanData.pH <= 7.9
  ) {
    stateText =
      oceanData.pH <= 7.4
        ? "☠️ Corales afectados gravemente"
        : "⚠️ Corales afectados";
  }


  if (
    type === "snail" &&
    oceanData.pH <= 7.8
  ) {
    stateText =
      oceanData.pH <= 7.3
        ? "☠️ Caracoles afectados gravemente"
        : "⚠️ Caracoles afectados";
  }


  infoIcon.textContent =
    data.icon;

  infoTitle.textContent =
    data.name;

  infoDescription.textContent =
    data.description;


  infoStats.innerHTML = `
    <div>
      <strong>Cantidad:</strong> ${amount}
    </div>

    <div class="stat-emission">
      <strong>CO₂ emitido:</strong>
      ${emitted} unidades
    </div>

    <div class="stat-absorption">
      <strong>CO₂ absorbido:</strong>
      ${absorbed} unidades
    </div>

    <div>
      <strong>Balance:</strong>
      ${net > 0 ? "+" : ""}${net} unidades
    </div>

    <div class="state-stat">
      <strong>${stateText}</strong>
    </div>

    ${
      type === "coral" ||
      type === "snail" ||
      type === "algae"
        ? `
          <div>
            <strong>pH del océano:</strong>
            ${oceanData.pH.toFixed(2)}
          </div>
        `
        : ""
    }

    <br>

    <div>
      ${data.explanation}
    </div>
  `;


  infoPanel.classList.add(
    "visible"
  );
}


/*
  Controles laterales.
*/
Object.keys(inputs).forEach(key => {

  inputs[key].addEventListener(
    "input",
    event => {

      counts[key] =
        Number(event.target.value);

      updateSimulation();
    }
  );

});


/*
  Elementos de la escena.

  Al hacer click:
  1. Se abre la información.
  2. Se inicia el recorrido de CO₂
     correspondiente.
*/
document
  .querySelectorAll("[data-info]")
  .forEach(element => {

    element.addEventListener(
      "click",
      () => {

        const type =
          element.dataset.info;

        showInfo(type);

        if (flowDirections[type]) {
          animateFlow(
            type,
            element
          );
        }
      }
    );

  });


/*
  Cerrar panel.
*/
closeInfo.addEventListener(
  "click",
  () => {
    infoPanel.classList.remove(
      "visible"
    );
  }
);


/*
  Reiniciar.
*/
document
  .getElementById("resetBtn")
  .addEventListener(
    "click",
    () => {

      counts = {
        ...defaultCounts
      };


      Object.keys(inputs)
        .forEach(key => {

          inputs[key].value =
            counts[key];

        });


      /*
        Detener cualquier recorrido
        que esté activo.
      */
      Object.keys(flowIntervals)
        .forEach(type => {

          clearInterval(
            flowIntervals[type]
          );

          delete flowIntervals[type];
        });


      document
        .querySelectorAll(
          ".particle-flow-container"
        )
        .forEach(container => {
          container.remove();
        });


      infoPanel.classList.remove(
        "visible"
      );

      updateSimulation();
    }
  );


updateSimulation();