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
    emitted: 1,
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
   NUEVA MODIFICACIÓN:
   MUERTE REAL DE LOS ELEMENTOS POR CONTAMINACIÓN

   Si el ambiente supera los límites:
   - Los árboles desaparecen y pasan a 0.
   - Los humedales desaparecen y pasan a 0.
   - Las algas desaparecen y pasan a 0.
   - También se actualizan sus controles.
   ========================================================= */

function applyEnvironmentalDeaths() {

  let huboCambios = true;
  let intentos = 0;

  while (huboCambios && intentos < 5) {

    huboCambios = false;
    intentos++;

    const co2 = calculateAtmosphericCO2();
    const ocean = calculateOcean(co2);

    // ÁRBOLES: mueren con CO2 igual o superior a 1700.
    if (co2 >= 1700 && counts.tree > 0) {
      counts.tree = 0;
      inputs.tree.value = 0;
      huboCambios = true;
    }

    // HUMEDALES: mueren con CO2 igual o superior a 1700.
    if (co2 >= 1700 && counts.wetland > 0) {
      counts.wetland = 0;
      inputs.wetland.value = 0;
      huboCambios = true;
    }

    // ALGAS: mueren cuando el pH llega a 7.45 o menos.
    if (ocean.pH <= 7.45 && counts.algae > 0) {
      counts.algae = 0;
      inputs.algae.value = 0;
      huboCambios = true;
    }


/* GANADO:
   Muere cuando el CO₂ llega a 1700 unidades.

   Se actualiza tanto la cantidad interna
   como la barra de control.
*/

    if (co2 >= 1700 && counts.cattle > 0) {
      counts.cattle = 0;
      inputs.cattle.value = 0;
      huboCambios = true;

    }


  }

}

/* =========================================================
   NUEVA MODIFICACIÓN:
   DESAPARICIÓN DE ELEMENTOS CUANDO LLEGAN A 0
   ========================================================= */

function updateSceneVisibility(atmosphericCO2) {

  // Elementos que dependen de una variable del panel.
  const sceneElements = [
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

  sceneElements.forEach(name => {

    const elements = document.querySelectorAll(
      `[data-info="${name}"]`
    );

    // Si la cantidad es 0, desaparece.
    // Si es mayor a 0, vuelve a aparecer.
    const shouldDisappear = counts[name] <= 0;

    
    elements.forEach(element => {

      element.classList.toggle(
        "dead",
        shouldDisappear
      );

    });

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
    /* =====================================================
     GANADO
     Desaparece progresivamente cuando aumenta el CO₂.
     ===================================================== */

  const cattle = document.querySelector(".cattle");

  // Comienza a disminuir cuando el CO₂ supera 700.
  // Desaparece completamente al llegar a 1500.
  const cattleLoss = Math.max(
    0,
    Math.min(
      1,
      (atmosphericCO2 - 700) / 800
    )
  );

  if (cattle) {
    cattle.style.opacity = String(1 - cattleLoss);

    cattle.style.transition = "opacity 1s ease";

    cattle.classList.toggle(
      "dead",
      cattleLoss >= 1
    );
  }

  // Cuando desaparece, el indicador de ganado pasa a 0.
  if (cattleLoss >= 1 && counts.cattle > 0) {
    counts.cattle = 0;

    updateLabels();
  }

  
  

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

// Cuando el CO2 llega a 1700 unidades,
// el bosque desaparece completamente.
  forest.classList.toggle(
    "dead",
    atmosphericCO2 >= 1700
  );

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
// Cuando el deterioro llega al máximo,
// las algas desaparecen.
  algae.classList.toggle(
   "dead",
    algaeLoss >= 1
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
// Los corales desaparecen cuando
// el deterioro llega al máximo.
  coral.classList.toggle(
    "dead",
    coralLoss >= 1
  );

  /* =====================================================
     CARACOLES
     ===================================================== */

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

  // Desaparecen cuando el pH llega a 7.6
  const snailsDead = pH <= 7.6;

  if (snailsDead) {
    snails.style.display = "none";
  } else {
    snails.style.display = "";
    snails.style.opacity =
      String(1 - snailLoss * .7);
  }

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
    // MODIFICACIÓN:
  // Primero comprobar si algún elemento murió por contaminación.
  applyEnvironmentalDeaths();

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

  // NUEVA MODIFICACIÓN:
  // Actualizar la visibilidad de los elementos.
  updateSceneVisibility(atmospheric);

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
   NUEVA MODIFICACIÓN:
   LÍMITES DE RECUPERACIÓN SEGÚN LA CONTAMINACIÓN
   ========================================================= */

// Mensaje de advertencia dentro del panel.
const recoveryWarning = document.createElement("div");

recoveryWarning.className = "recovery-warning";
recoveryWarning.textContent = "";

const controlPanel = document.querySelector(".control-panel");

controlPanel.insertBefore(
  recoveryWarning,
  controlPanel.querySelector(".control-group")
);


// Calcula cuánto puede recuperarse cada elemento.
function getRecoveryLimit(name, co2) {

  const maximum = Number(inputs[name].max);

  let percentage = 1;

  if (co2 >= 1700) {
    percentage = 0;
  } else if (co2 >= 1400) {
    percentage = 0.10;
  } else if (co2 >= 1100) {
    percentage = 0.25;
  } else if (co2 >= 800) {
    percentage = 0.50;
  }

  return Math.floor(maximum * percentage);
}


// Muestra el aviso cuando se intenta superar el límite.
function showRecoveryWarning(maximum) {

  recoveryWarning.textContent =
    "⚠️ El planeta está muy contaminado. " +
    "Reduce los contaminantes para aumentar este parámetro. " +
    "Máximo permitido actualmente: " + maximum + ".";

  recoveryWarning.classList.add("visible");

}


// Oculta el aviso.
function hideRecoveryWarning() {

  recoveryWarning.textContent = "";

  recoveryWarning.classList.remove("visible");

}

/* =========================================================
   CONTROLES
   ========================================================= */


/* =========================================================
   CONTROLES
   MODIFICACIÓN:
   LIMITAR LA RECUPERACIÓN DE ELEMENTOS NATURALES
   ========================================================= */

inputNames.forEach(name => {

  inputs[name].addEventListener(
    "input",
    event => {

      let newValue = Number(event.target.value);

      
      const naturalElements = [
        "tree",
        "algae",
        "wetland",
        "cattle"
      ];


      hideRecoveryWarning();

      // Solo restringir árboles, algas y humedales.
      if (naturalElements.includes(name)) {

        const currentCO2 = calculateAtmosphericCO2();

        const maximumAllowed =
          getRecoveryLimit(name, currentCO2);

        // Si se intenta aumentar por encima del límite,
        // se mantiene el máximo permitido.
        if (
          newValue > counts[name] &&
          newValue > maximumAllowed
        ) {

          newValue = Math.max(
            counts[name],
            maximumAllowed
          );

          event.target.value = newValue;

          showRecoveryWarning(maximumAllowed);

        }

      }

      counts[name] = newValue;

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


/* ==========================================
   COORDENADAS CORREGIDAS
   PARA PAISAJE ESCALADO
   ========================================== */

function getElementCenter(element, skyRect) {

  const sky = document.querySelector(".sky");

  if (!sky || !element) {
    return { x: 0, y: 0 };
  }

  // Usar la imagen real para localizar
  // el punto de origen o destino.
  const image = element.querySelector("img");

  const target = image || element;

  const rect = target.getBoundingClientRect();

  // Escala real aplicada al paisaje.
  const scaleX =
    skyRect.width / sky.offsetWidth;

  const scaleY =
    skyRect.height / sky.offsetHeight;

  return {

    x: (
      rect.left -
      skyRect.left +
      rect.width / 2
    ) / scaleX,

    y: (
      rect.top -
      skyRect.top +
      rect.height / 2
    ) / scaleY

  };

}



/* =========================================================
   NUEVA MODIFICACIÓN:
   LOS INCENDIOS EMITEN PELotITAS ROJAS AUTOMÁTICAMENTE
   ========================================================= */

function createFireCO2Particle() {

  if (!co2ParticleLayer) return;

  const fire = document.querySelector(".fire");

  const sky = document.querySelector(".sky");

  const atmosphere = document.querySelector(
    ".atmosphere-label"
  );

  // Solo emitir cuando los incendios estén activos.
  if (!fire || !fire.classList.contains("fire-active")) {
    return;
  }

  if (!sky || !atmosphere) return;

  const skyRect = sky.getBoundingClientRect();

  const firePoint = getElementCenter(
    fire,
    skyRect
  );

  
/* Centro de la atmósfera corregido
   según el escalado del paisaje */

const atmospherePoint =
  getElementCenter(
    atmosphere,
    skyRect
  );


  const particle = document.createElement("span");

  particle.className = "co2-particle emission";

  // Punto de partida: incendios.
  particle.style.setProperty(
    "--start-x",
    `${firePoint.x - 5}px`
  );

  particle.style.setProperty(
    "--start-y",
    `${firePoint.y - 5}px`
  );

  // Punto de llegada: atmósfera.
  particle.style.setProperty(
    "--end-x",
    `${atmospherePoint.x - 5}px`
  );

  particle.style.setProperty(
    "--end-y",
    `${atmospherePoint.y - 5}px`
  );

  // Sin retraso: salen continuamente.
  particle.style.setProperty(
    "--delay",
    "0s"
  );

  co2ParticleLayer.appendChild(particle);

  // Eliminar la pelotita cuando termina la animación.
  particle.addEventListener(
    "animationend",
    () => {
      particle.remove();
    },
    { once: true }
  );

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

  
/* Centro de la atmósfera corregido
   según el escalado del paisaje */

const atmospherePoint =
  getElementCenter(
    atmosphere,
    skyRect
  );



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
        `${startX - 5}px`
      );

      particle.style.setProperty(
        "--start-y",
        `${startY - 5}px`
      );

      particle.style.setProperty(
        "--end-x",
        `${endX - 5}px`
      );

      particle.style.setProperty(
        "--end-y",
        `${endY - 5}px`
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

/* =====================================================
   MODO DESAFÍOS
   NUEVA FUNCIONALIDAD
   ===================================================== */

/* =====================================================
   MODO DESAFÍOS
   INGRESO DIRECTO A LA PÁGINA DE DESAFÍOS
   ===================================================== */

const challengesBtn = document.getElementById("challengesBtn");

challengesBtn.addEventListener("click", () => {

  window.location.href = "./desafios.html";

});



/* ==========================================
   TRASLADAR INFORMACIÓN AL PANEL IZQUIERDO
   ========================================== */

const panelVariablesInfo =
  document.querySelector(".control-panel");

const panelInformacionInfo =
  document.getElementById("infoPanel");

if (panelVariablesInfo && panelInformacionInfo) {

  // Mover el panel informativo dentro
  // del panel izquierdo de variables.
  panelVariablesInfo.appendChild(
    panelInformacionInfo
  );

}