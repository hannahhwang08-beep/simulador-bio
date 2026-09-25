/*
=========================================================
SIMULADOR DEL CICLO DEL CARBONO

MODIFICACIONES:
1. O₂ máximo = 21%.
2. Temperatura menos sensible.
3. Nivel del mar aumenta con la temperatura.
4. Humedales absorben CO₂.
5. Incendios automáticos.
6. Glaciar animado.
7. Humedal animado.
8. Deforestación muestra troncos solamente
   cuando la cantidad es mayor a 0.
9. No existe control manual de incendios.
10. Glaciar clickeable con información y reducción visible.
11. Mini círculos de CO₂ al hacer click en los elementos.
12. Caracoles se vuelven semitransparentes sin desaparecer.
=========================================================
*/


/* =========================================================
   DATOS
   ========================================================= */

const carbonData = {

  factory: {
    name: "Fábrica",
    icon: "🏭",
    emitted: 100,
    absorbed: 0,
    description:
      "La quema de combustibles fósiles en industrias libera CO₂ a la atmósfera.",
    explanation:
      "Cada fábrica representa 100 unidades de CO₂ emitidas."
  },

  car: {
    name: "Auto",
    icon: "🚗",
    emitted: 1,
    absorbed: 0,
    description:
      "Los vehículos que utilizan combustibles fósiles liberan CO₂.",
    explanation:
      "Cada vehículo representa 1 unidad de CO₂ emitida."
  },

  tree: {
    name: "Planta / árbol",
    icon: "🌳",
    emitted: 10,
    absorbed: 15,
    description:
      "Las plantas realizan fotosíntesis y absorben CO₂.",
    explanation:
      "Cada planta absorbe CO₂ de la atmósfera."
  },

  cattle: {
    name: "Ganado",
    icon: "🐄",
    emitted: 8,
    absorbed: 0,
    description:
      "El ganado forma parte del ciclo del carbono.",
    explanation:
      "Para simplificar, se representa principalmente la emisión."
  },

  algae: {
    name: "Algas",
    icon: "🌿",
    emitted: 4,
    absorbed: 12,
    description:
      "Las algas realizan fotosíntesis y absorben CO₂ disuelto.",
    explanation:
      "Cuando el océano se acidifica demasiado, las algas disminuyen."
  },

  whaleBeach: {
    name: "Materia en descomposición en la playa",
    icon: "🐋",
    emitted: 12,
    absorbed: 0,
    description:
      "La descomposición de materia orgánica devuelve carbono al ambiente.",
    explanation:
      "La materia orgánica libera parte de su carbono durante la descomposición."
  },

  whaleSea: {
    name: "Materia en descomposición en el mar",
    icon: "🐋",
    emitted: 15,
    absorbed: 0,
    description:
      "En el mar viven muchos organismos que incorporan carbono a sus cuerpos. Cuando mueren, sus restos comienzan a descomponerse. Parte de ese carbono no vuelve inmediatamente a la atmósfera, sino que queda atrapado en el agua y puede llegar al fondo del océano, donde permanece almacenado durante mucho tiempo.",
    explanation:
      "Parte del carbono puede permanecer almacenado en el océano."
  },

  housing: {
    name: "Viviendas",
    icon: "🏠",
    emitted: 50,
    absorbed: 0,
    description:
      "Las viviendas representan consumo de energía.",
    explanation:
      "Cada unidad representa 1.000 viviendas y 50 unidades de CO₂."
  },

  energy: {
    name: "Producción de energía fósil",
    icon: "⚡",
    emitted: 80,
    absorbed: 0,
    description:
      "La producción de energía mediante combustibles fósiles libera CO₂.",
    explanation:
      "Cada unidad representa 80 unidades de CO₂ emitidas."
  },

  deforestation: {
    name: "Deforestación",
    icon: "🌲",
    emitted: 100,
    absorbed: 0,
    description:
      "La deforestación libera carbono y reduce la vegetación disponible.",
    explanation:
      "Cada unidad representa 100 unidades de CO₂ emitidas."
  },

  wetland: {
    name: "Humedales / turberas / pantanos",
    icon: "🌾",
    emitted: 0,
    absorbed: 25,
    description:
      "Los humedales, como los pantanos, bañados y esteros, tienen plantas que absorben dióxido de carbono (CO₂) de la atmósfera. Cuando estas plantas mueren, sus restos quedan acumulados en suelos que permanecen muy húmedos y con poco oxígeno. Por eso se descomponen lentamente y parte del carbono queda almacenado en el suelo durante mucho tiempo, en lugar de volver rápidamente a la atmósfera.",
    explanation:
      "Parte del carbono queda almacenado durante mucho tiempo en los suelos húmedos."
  },

  coral: {
    name: "Corales",
    icon: "🪸",
    emitted: 0,
    absorbed: 0,
    description:
      "El blanqueamiento de los corales ocurre cuando estos pierden sus colores vibrantes y se quedan blancos. Pero eso no es todo. Los corales son brillantes y coloridos debido a unas algas microscópicas llamadas zooxantelas que viven dentro de los corales. Las algas y los corales viven en una relación simbiótica ayudándose mutuamente a sobrevivir. Sin embargo, cuando la temperatura del océano cambia -por ejemplo, si hace demasiado calor-, los corales se estresan y expulsan las algas. A medida que las algas se van, el coral se desvanece hasta que parece que ha sido blanqueado. Si la temperatura permanece alta, el coral no permitirá que las algas regresen y el coral morirá.",
    explanation:
      "El aumento de temperatura puede provocar que pierdan las algas microscópicas que viven asociadas a ellos."
  },

  snail: {
    name: "Caracoles de mar",
    icon: "🐚",
    emitted: 0,
    absorbed: 0,
    description:
      "Los caracoles marinos poseen estructuras calcáreas que pueden verse afectadas por la acidificación.",
    explanation:
      "Una disminución importante del pH puede afectar a estos organismos."
  },

  /* =====================================================
     MODIFICACIÓN:
     GLACIAR AHORA TIENE INFORMACIÓN COMO LOS DEMÁS
     ===================================================== */

  glacier: {
    name: "Glaciar",
    icon: "🧊",
    emitted: 0,
    absorbed: 0,
    description:
      "Los glaciares almacenan agua en forma de hielo y disminuyen de tamaño cuando aumenta la temperatura.",
    explanation:
      "El calentamiento provoca el derretimiento progresivo del hielo. En el modelo, el tamaño del glaciar se reduce a medida que aumenta la temperatura."
  },

  fire: {
    name: "Incendios",
    icon: "🔥",
    emitted: 0,
    absorbed: 0,
    description:
      "Los incendios aparecen automáticamente cuando aumenta suficientemente la temperatura.",
    explanation:
      "No se controlan con una barra: el modelo los genera automáticamente a medida que aumenta el calentamiento."
  }

};


/* =========================================================
   VALORES INICIALES
   ========================================================= */

const defaultCounts = {

  factory: 2,
  car: 5,
  tree: 10,

  cattle: 5,
  algae: 20,

  whaleBeach: 1,
  whaleSea: 1,

  housing: 1,
  energy: 1,

  deforestation: 0,

  /* MODIFICACIÓN:
     comienza con un humedal */
  wetland: 1
};


let counts = {
  ...defaultCounts
};


/* =========================================================
   CONTROLES
   ========================================================= */

const inputNames = [
  "factory",
  "car",
  "tree",
  "housing",
  "energy",
  "deforestation",
  "wetland",
  "cattle",
  "algae",
  "whaleBeach",
  "whaleSea"
];

const inputs = {};
const valueLabels = {};

inputNames.forEach(name => {

  inputs[name] =
    document.getElementById(`${name}Count`);

  valueLabels[name] =
    document.getElementById(`${name}CountValue`);

});


/* =========================================================
   ELEMENTOS DEL DOM
   ========================================================= */

const totalEmitted =
  document.getElementById("totalEmitted");

const totalAbsorbed =
  document.getElementById("totalAbsorbed");

const netBalance =
  document.getElementById("netBalance");

const atmosphereCO2 =
  document.getElementById("atmosphereCO2");

const temperature =
  document.getElementById("temperature");

const oxygen =
  document.getElementById("oxygen");

const dissolvedCO2 =
  document.getElementById("dissolvedCO2");

const oceanPH =
  document.getElementById("oceanPH");

const oceanOxygen =
  document.getElementById("oceanOxygen");

const co2Status =
  document.getElementById("co2Status");

const ecosystemMessage =
  document.getElementById("ecosystemMessage");

const seaLevel =
  document.getElementById("seaLevel");

const polarIce =
  document.getElementById("polarIce");

const infoPanel =
  document.getElementById("infoPanel");

const infoIcon =
  document.getElementById("infoIcon");

const infoTitle =
  document.getElementById("infoTitle");

const infoDescription =
  document.getElementById("infoDescription");

const infoStats =
  document.getElementById("infoStats");

const oceanPHCard =
  document.getElementById("oceanPHCard");


/* =========================================================
   EMISIONES BÁSICAS
   ========================================================= */

function calculateBaseEmissions() {

  let total = 0;

  total +=
    counts.factory *
    carbonData.factory.emitted;

  total +=
    counts.car *
    carbonData.car.emitted;

  total +=
    counts.cattle *
    carbonData.cattle.emitted;

  total +=
    counts.housing *
    carbonData.housing.emitted;

  total +=
    counts.energy *
    carbonData.energy.emitted;

  total +=
    counts.deforestation *
    carbonData.deforestation.emitted;

  total +=
    counts.whaleBeach *
    carbonData.whaleBeach.emitted;

  total +=
    counts.whaleSea *
    carbonData.whaleSea.emitted;

  total +=
    counts.algae *
    carbonData.algae.emitted;

  return Math.round(total);
}


/* =========================================================
   TEMPERATURA
   MODIFICACIÓN:
   ESCALA MENOS SENSIBLE
   ========================================================= */

function calculateTemperatureIncrease(co2) {

  if (co2 <= 1000) {
    return 0;
  }

  /*
    1.500 CO₂ = +0,25 °C
    2.000 CO₂ = +0,50 °C
    2.500 CO₂ = +0,75 °C
  */

  return Math.max(
    0,
    Math.min(
      3,
      (co2 - 1000) / 2000
    )
  );

}


/* =========================================================
   INCENDIOS AUTOMÁTICOS
   ========================================================= */

function calculateFireLevel(co2) {

  const temp =
    calculateTemperatureIncrease(co2);

  /*
    No hay incendios al comenzar.

    Comienzan después de +0,10 °C
    y aumentan progresivamente.
  */

  const startTemperature = 0.10;

  return Math.max(
    0,
    Math.min(
      1,
      (temp - startTemperature) / 0.90
    )
  );

}


function calculateFireEmissions() {

  const co2 =
    calculateAtmosphericCO2WithoutFire();

  const fireLevel =
    calculateFireLevel(co2);

  /*
    Máximo didáctico de 120 unidades.
  */

  return Math.round(
    fireLevel * 120
  );

}


/* =========================================================
   ABSORCIÓN
   ========================================================= */

function calculateAbsorptions() {

  let total = 0;

  total +=
    counts.tree *
    carbonData.tree.absorbed;

  total +=
    counts.algae *
    carbonData.algae.absorbed;

  total +=
    counts.wetland *
    carbonData.wetland.absorbed;

  return Math.round(total);
}


/* =========================================================
   CO₂ SIN INCENDIOS
   ========================================================= */

function calculateAtmosphericCO2WithoutFire() {

  return Math.max(
    0,
    calculateBaseEmissions() -
    calculateAbsorptions()
  );

}


/* =========================================================
   CO₂ TOTAL
   ========================================================= */

function calculateEmissions() {

  return Math.round(
    calculateBaseEmissions() +
    calculateFireEmissions()
  );

}


/* =========================================================
   CO₂ ATMOSFÉRICO
   ========================================================= */

function calculateAtmosphericCO2() {

  return Math.max(
    0,
    calculateEmissions() -
    calculateAbsorptions()
  );

}


/* =========================================================
   OCÉANO
   ========================================================= */

function calculateOcean(co2) {

  const dissolved =
    Math.max(
      0,
      (co2 - 300) * 0.25
    );

  const pH =
    Math.max(
      7.45,
      8.2 - dissolved * 0.0015
    );

  const oceanO2 =
    Math.max(
      17,
      21 - dissolved * 0.004
    );

  return {
    dissolved,
    pH,
    oceanO2
  };

}


/* =========================================================
   OXÍGENO
   MODIFICACIÓN:
   NUNCA SUPERA 21%
   ========================================================= */

function calculateGlobalOxygen(
  co2,
  oceanData
) {

  const reduction =
    Math.max(
      0,
      (co2 - 1000) * 0.0015
    );

  return Math.max(
    0,
    Math.min(
      21,
      21 - reduction
    )
  );

}


/* =========================================================
   NIVEL DEL MAR
   ========================================================= */

function calculateSeaLevel(co2) {

  const temp =
    calculateTemperatureIncrease(co2);

  /*
    El nivel del mar aumenta gradualmente
    con el calentamiento.
  */

  return Math.max(
    0,
    temp * 18
  );

}


/* =========================================================
   ETIQUETAS
   ========================================================= */

function updateLabels() {

  inputNames.forEach(name => {

    valueLabels[name].textContent =
      counts[name];

  });

}


/* =========================================================
   ATMÓSFERA
   ========================================================= */

function updateAtmosphereVisual(co2) {

  const sky =
    document.querySelector(".sky");

  const heat =
    Math.min(
      0.28,
      calculateTemperatureIncrease(co2) / 8
    );

  sky.style.setProperty(
    "--heat",
    heat
  );


  if (co2 < 700) {

    co2Status.textContent =
      "Nivel estable";

    co2Status.className =
      "co2-status";

  } else if (co2 < 1200) {

    co2Status.textContent =
      "Nivel elevado";

    co2Status.className =
      "co2-status warning";

  } else {

    co2Status.textContent =
      "Nivel muy elevado";

    co2Status.className =
      "co2-status danger";

  }

}


/* =========================================================
   EFECTOS VISUALES
   ========================================================= */

function setElementEffects(
  atmosphericCO2,
  pH
) {

  const forest =
    document.querySelector(".forest");

  const algae =
    document.querySelector(".algae");

  const coral =
    document.querySelector(".coral");

  const snails =
    document.querySelector(".snails");

  const fire =
    document.querySelector(".fire");

  const wetland =
    document.querySelector(".wetland");

  const deforestation =
    document.querySelector(".deforestation");


  /* BOSQUE */

  const forestCO2 =
    Math.max(
      0,
      Math.min(
        1,
        (atmosphericCO2 - 500) / 1200
      )
    );

  const forestDeforestation =
    Math.min(
      1,
      counts.deforestation / 20
    );

  const fireLevel =
    calculateFireLevel(
      atmosphericCO2
    );

  const forestFireLoss =
    fireLevel * 0.75;

  const forestLoss =
    Math.max(
      forestCO2,
      forestDeforestation,
      forestFireLoss
    );


  forest.style.opacity =
    String(
      1 - forestLoss * .65
    );

  forest.style.transform =
    `scale(${1 - forestLoss * .15})`;


  /* =====================================================
     MODIFICACIÓN:
     TRONCOS DE DEFORESTACIÓN
     APARECEN SOLAMENTE SI > 0
     ===================================================== */

  if (deforestation) {

    deforestation.classList.toggle(
      "logs-visible",
      counts.deforestation > 0
    );

  }


  /* =====================================================
     INCENDIOS AUTOMÁTICOS
     ===================================================== */

  if (fire) {

    fire.classList.toggle(
      "fire-active",
      fireLevel > 0
    );

  }


  /* =====================================================
     HUMEDAL
     ===================================================== */

  if (wetland) {

    const wetlandMelt =
      Math.max(
        0,
        Math.min(
          1,
          calculateTemperatureIncrease(
            atmosphericCO2
          ) / 2.5
        )
      );

    wetland.style.setProperty(
      "--melt",
      wetlandMelt
    );

    wetland.classList.toggle(
      "melting",
      wetlandMelt > .02
    );

  }


  /* =====================================================
     ALGAS
     ===================================================== */

  const algaeLoss =
    Math.max(
      0,
      Math.min(
        1,
        (7.9 - pH) / .45
      )
    );

  algae.style.opacity =
    String(
      1 - algaeLoss * .7
    );


  /* =====================================================
     CORALES
     ===================================================== */

  const coralLoss =
    Math.max(
      0,
      Math.min(
        1,
        (8.05 - pH) / .55
      )
    );

  coral.style.opacity =
    String(
      1 - coralLoss * .7
    );


  /* =====================================================
     CARACOLES
     ===================================================== */

  const snailLoss =
    Math.max(
      0,
      Math.min(
        1,
        (7.85 - pH) / .4
      )
    );

  /* MODIFICACIÓN:
     Los caracoles se vuelven semitransparentes,
     igual que corales, árboles, algas y humedales,
     pero no desaparecen completamente. */
  snails.style.opacity =
    String(
      1 - snailLoss * .7
    );


  /* =====================================================
     GLACIAR
     ===================================================== */

  if (polarIce) {

    const melt =
      Math.max(
        0,
        Math.min(
          1,
          calculateTemperatureIncrease(
            atmosphericCO2
          ) / 2.5
        )
      );

    polarIce.style.setProperty(
      "--melt",
      melt
    );

    polarIce.classList.toggle(
      "melting",
      melt > .02
    );

  }

}


/* =========================================================
   INFORMACIÓN
   ========================================================= */

function showInfo(type) {

  const data =
    carbonData[type];

  if (!data) return;

  const amount =
    counts[type] || 1;

  const emitted =
    type === "fire"
      ? calculateFireEmissions()
      : amount * data.emitted;

  const absorbed =
    amount * data.absorbed;

  const balance =
    emitted - absorbed;


  infoIcon.textContent =
    data.icon;

  infoTitle.textContent =
    data.name;

  infoDescription.textContent =
    data.description;


  infoStats.innerHTML = `

    <div>
      <strong>Cantidad:</strong>
      ${amount}
    </div>

    <div>
      <strong>CO₂ emitido:</strong>
      ${Math.round(emitted)}
      unidades
    </div>

    <div>
      <strong>CO₂ absorbido:</strong>
      ${Math.round(absorbed)}
      unidades
    </div>

    <div>
      <strong>Balance:</strong>
      ${balance > 0 ? "+" : ""}
      ${Math.round(balance)}
      unidades
    </div>

    <div>
      ${data.explanation}
    </div>

  `;

  infoPanel.classList.add("visible");

}


/* =========================================================
   CLICK SOBRE pH
   ========================================================= */

if (oceanPHCard) {

  oceanPHCard.addEventListener(
    "click",
    () => {

      infoIcon.textContent =
        "🧪";

      infoTitle.textContent =
        "pH en el océano";

      infoDescription.textContent =
        "Un pequeño cambio en el pH del agua puede suponer en muchos casos catástrofes medioambientales graves como la destrucción de arrecifes de coral, especialmente susceptible a cambios en la acidez del agua de mar. Se estima que entre 1751 y 1994 el pH de la superficie del océano ha descendido desde aproximadamente 8.179 a 8.104 (-0.075). Las proyecciones para 2100 indican que a medida que el océano absorba más CO2 se producirá un descenso de más de 0.3-0.5. En combinación con otros cambios biogeoquímicos del océano, esta disminución del valor del pH podría socavar el funcionamiento de los ecosistemas marinos y alterar la provisión de numerosos bienes y servicios asociados al océano, a partir del año 2100.";

      infoStats.innerHTML = `

        <div>
          <strong>pH actual:</strong>
          ${oceanPH.textContent}
        </div>

        <div>
          <strong>Indicador:</strong>
          acidificación oceánica
        </div>

      `;

      infoPanel.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   CERRAR INFO
   ========================================================= */

document
  .getElementById("closeInfo")
  .addEventListener(
    "click",
    () => {

      infoPanel.classList.remove(
        "visible"
      );

    }
  );


/* =========================================================
   ACTUALIZAR SIMULACIÓN
   ========================================================= */

function updateSimulation() {

  const emitted =
    calculateEmissions();

  const absorbed =
    calculateAbsorptions();

  const atmospheric =
    calculateAtmosphericCO2();

  const tempIncrease =
    calculateTemperatureIncrease(
      atmospheric
    );

  const oceanData =
    calculateOcean(
      atmospheric
    );

  const globalO2 =
    calculateGlobalOxygen(
      atmospheric,
      oceanData
    );


  /* DASHBOARD */

  totalEmitted.textContent =
    emitted;

  totalAbsorbed.textContent =
    absorbed;

  netBalance.textContent =
    atmospheric;

  atmosphereCO2.textContent =
    atmospheric;


  temperature.textContent =
    `+${tempIncrease
      .toFixed(2)
      .replace(".", ",")} °C`;


  /*
    MODIFICACIÓN:
    máximo de oxígeno = 21%
  */

  oxygen.textContent =
    `${globalO2.toFixed(0)}%`;


  dissolvedCO2.textContent =
    oceanData.dissolved.toFixed(0);

  oceanPH.textContent =
    oceanData.pH.toFixed(2);

  oceanOxygen.textContent =
    `${oceanData.oceanO2.toFixed(0)}%`;


  /* NIVEL DEL MAR */

  seaLevel.textContent =
    `${calculateSeaLevel(
      atmospheric
    )
      .toFixed(1)
      .replace(".", ",")} cm`;


  updateLabels();

  updateAtmosphereVisual(
    atmospheric
  );

  setElementEffects(
    atmospheric,
    oceanData.pH
  );


  /* =====================================================
     MENSAJES
     ===================================================== */

  const messages = [];

  if (atmospheric >= 500) {

    messages.push(
      "🌳 Los árboles comienzan a verse afectados."
    );

  }

  if (globalO2 < 20) {

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

  if (tempIncrease >= .25) {

    messages.push(
      "🌡️ Aumenta la temperatura."
    );

  }

  if (
    calculateSeaLevel(
      atmospheric
    ) > 0
  ) {

    messages.push(
      "🌊 El nivel del mar aumenta con el calentamiento."
    );

  }

  if (tempIncrease > 0) {

    messages.push(
      "🧊 Los glaciares comienzan a reducirse."
    );

  }


  /* INCENDIOS AUTOMÁTICOS */

  const fireLevel =
    calculateFireLevel(
      atmospheric
    );

  if (fireLevel > 0) {

    messages.push(
      fireLevel > .65
        ? "🔥 Los incendios se intensifican."
        : "🔥 Comienzan a aparecer incendios."
    );

  }


  ecosystemMessage.textContent =
    messages.length
      ? messages.join(" ")
      : "El ecosistema se encuentra en condiciones normales.";

  ecosystemMessage.className =
    "ecosystem-message" +
    (
      messages.length
        ? " warning-message"
        : ""
    );

}


/* =========================================================
   CONTROLES
   ========================================================= */

inputNames.forEach(name => {

  inputs[name].addEventListener(
    "input",
    event => {

      counts[name] =
        Number(
          event.target.value
        );

      updateSimulation();

    }
  );

});


/* =========================================================
   FLUJO DE CO₂ AL HACER CLICK
   MODIFICACIÓN:
   Se generan mini círculos ordenados entre el elemento
   seleccionado y la etiqueta ATMÓSFERA.
   ========================================================= */

const co2ParticleLayer =
  document.getElementById("co2ParticleLayer");

function getElementCenter(element, skyRect) {

  const rect =
    element.getBoundingClientRect();

  return {
    x:
      rect.left -
      skyRect.left +
      rect.width / 2,

    y:
      rect.top -
      skyRect.top +
      rect.height / 2
  };

}


function createCO2Particles(
  element,
  type
) {

  if (!co2ParticleLayer) return;

  const data =
    carbonData[type];

  if (!data) return;

  const hasEmission =
    data.emitted > 0;

  const hasAbsorption =
    data.absorbed > 0;

  if (!hasEmission && !hasAbsorption) {
    return;
  }

  const sky =
    document.querySelector(".sky");

  const atmosphere =
    document.querySelector(".atmosphere-label");

  if (!sky || !atmosphere) return;

  const skyRect =
    sky.getBoundingClientRect();

  const elementPoint =
    getElementCenter(
      element,
      skyRect
    );

  const atmosphereRect =
    atmosphere.getBoundingClientRect();

  const atmospherePoint = {
    x:
      atmosphereRect.left -
      skyRect.left +
      atmosphereRect.width / 2,

    y:
      atmosphereRect.top -
      skyRect.top +
      atmosphereRect.height / 2
  };


  /*
    Se usan círculos pequeños y espaciados
    para que el movimiento se vea ordenado.
  */
  const particleCount = 8;

  function launchParticles(
    className,
    start,
    end
  ) {

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      const particle =
        document.createElement("span");

      particle.className =
        `co2-particle ${className}`;

      const offset =
        (i % 2 === 0 ? -1 : 1) *
        Math.min(
          7,
          i * 0.8
        );

      const startX =
        start.x + offset;

      const startY =
        start.y;

      const endX =
        end.x + offset * .35;

      const endY =
        end.y;

      particle.style.setProperty(
        "--start-x",
        `${startX - 3.5}px`
      );

      particle.style.setProperty(
        "--start-y",
        `${startY - 3.5}px`
      );

      particle.style.setProperty(
        "--end-x",
        `${endX - 3.5}px`
      );

      particle.style.setProperty(
        "--end-y",
        `${endY - 3.5}px`
      );

      /*
        Cada círculo sale después del anterior.
      */
      particle.style.setProperty(
        "--delay",
        `${i * 0.11}s`
      );

      co2ParticleLayer.appendChild(
        particle
      );

      particle.addEventListener(
        "animationend",
        () => {
          particle.remove();
        },
        { once: true }
      );

    }

  }


  /*
    EMISIÓN:
    elemento -> atmósfera
  */
  if (hasEmission) {

    launchParticles(
      "emission",
      elementPoint,
      atmospherePoint
    );

  }


  /*
    ABSORCIÓN:
    atmósfera -> elemento
  */
  if (hasAbsorption) {

    launchParticles(
      "absorption",
      atmospherePoint,
      elementPoint
    );

  }

}


/* =========================================================
   ELEMENTOS DEL PAISAJE
   ========================================================= */

document
  .querySelectorAll("[data-info]")
  .forEach(element => {

    element.addEventListener(
      "click",
      () => {

        const type =
          element.dataset.info;

        showInfo(type);

        /*
          El flujo se activa solamente al hacer click,
          sin modificar los cálculos ni el resto del diseño.
        */
        createCO2Particles(
          element,
          type
        );

      }
    );

  });


/* =========================================================
   REINICIAR
   ========================================================= */

document
  .getElementById("resetBtn")
  .addEventListener(
    "click",
    () => {

      counts = {
        ...defaultCounts
      };

      inputNames.forEach(name => {

        inputs[name].value =
          counts[name];

      });

      infoPanel.classList.remove(
        "visible"
      );

      updateSimulation();

    }
  );


/* =========================================================
   INICIO
   ========================================================= */

updateSimulation();