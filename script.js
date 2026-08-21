/*
  SIMULADOR DEL CICLO DEL CARBONO

  IMPORTANTE:
  Los valores utilizados son "unidades didácticas de CO₂".
  NO representan cantidades reales de moléculas, toneladas o ppm.

  El objetivo es que el alumno pueda experimentar con:
  emisiones - absorciones = balance neto
*/

// --------------------------------------------------
// CONFIGURACIÓN DE CADA ELEMENTO
// --------------------------------------------------

const carbonData = {

  factory: {
    name: "Fábrica",
    icon: "🏭",

    // Emisión por fábrica
    emitted: 100,

    // Las fábricas no absorben CO₂ en este modelo
    absorbed: 0,

    description:
      "La quema de combustibles fósiles en industrias libera dióxido de carbono a la atmósfera. En este modelo, las fábricas representan una fuente de carbono atmosférico.",

    explanation:
      "Cuando se utilizan combustibles fósiles como carbón, petróleo o gas natural, el carbono almacenado durante millones de años pasa rápidamente a la atmósfera principalmente en forma de CO₂."
  },

  car: {
    name: "Auto",
    icon: "🚗",

    emitted: 20,
    absorbed: 0,

    description:
      "Los vehículos que utilizan combustibles fósiles liberan CO₂ durante la combustión.",

    explanation:
      "El carbono presente en la gasolina o el diésel se combina con oxígeno durante la combustión y genera principalmente CO₂, que pasa a la atmósfera."
  },

  tree: {
    name: "Planta / árbol",
    icon: "🌳",

    // Respiración vegetal: libera CO₂
    emitted: 10,

    // Fotosíntesis: captura CO₂
    absorbed: 15,

    description:
      "Las plantas intercambian carbono constantemente con la atmósfera. Respiran y liberan CO₂, pero mediante la fotosíntesis capturan CO₂ para producir materia orgánica.",

    explanation:
      "Durante la fotosíntesis, las plantas toman CO₂ de la atmósfera y utilizan la energía de la luz para fabricar moléculas orgánicas. Al mismo tiempo, las plantas realizan respiración celular y liberan CO₂. En este ejemplo, una planta captura más CO₂ del que libera."
  },

  cattle: {
    name: "Ganado",
    icon: "🐄",

    emitted: 8,
    absorbed: 0,

    description:
      "El ganado forma parte del ciclo del carbono porque el carbono presente en su alimento pasa por su organismo y vuelve al ambiente mediante la respiración y otros procesos.",

    explanation:
      "Los animales obtienen carbono al alimentarse. Una parte vuelve a la atmósfera como CO₂ mediante la respiración. En rumiantes también existe producción de metano durante la digestión, aunque este simulador se concentra en el CO₂ para simplificar el modelo."
  },

  algae: {
    name: "Algas",
    icon: "🌿",

    emitted: 4,
    absorbed: 12,

    description:
      "Las algas marinas realizan fotosíntesis y absorben CO₂ disuelto en el agua.",

    explanation:
      "Las algas utilizan carbono inorgánico disponible en el océano para realizar fotosíntesis. El carbono puede incorporarse a su biomasa y posteriormente pasar a otros organismos o volver al ambiente."
  },

  whaleBeach: {
    name: "Ballena muerta en la playa",
    icon: "🐋",

    emitted: 12,
    absorbed: 0,

    description:
      "Cuando un organismo muere comienza la descomposición. Los microorganismos degradan su materia orgánica y parte del carbono vuelve al ambiente.",

    explanation:
      "Una ballena contiene una gran cantidad de carbono en sus tejidos. Después de morir, organismos descomponedores utilizan esa materia. La respiración de los descomponedores puede liberar CO₂, mientras que otra parte del carbono puede permanecer en sedimentos o pasar a otros organismos."
  },

  whaleSea: {
    name: "Ballena muerta en el océano",
    icon: "🐋",

    emitted: 15,
    absorbed: 0,

    description:
      "Una ballena muerta en el océano aporta materia orgánica y carbono al ecosistema marino.",

    explanation:
      "El cuerpo de una ballena puede alimentar a numerosos organismos. Durante la descomposición, parte del carbono vuelve al agua como carbono disuelto y eventualmente puede intercambiarse con la atmósfera. Otra parte puede quedar almacenada en el fondo marino."
  }
};


// --------------------------------------------------
// VALORES INICIALES
// --------------------------------------------------

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


// --------------------------------------------------
// ELEMENTOS DEL DOM
// --------------------------------------------------

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

const infoPanel = document.getElementById("infoPanel");
const infoIcon = document.getElementById("infoIcon");
const infoTitle = document.getElementById("infoTitle");
const infoDescription = document.getElementById("infoDescription");
const infoStats = document.getElementById("infoStats");
const closeInfo = document.getElementById("closeInfo");


// --------------------------------------------------
// ACTUALIZAR VALORES DE LOS CONTROLES
// --------------------------------------------------

function updateLabels() {

  Object.keys(inputs).forEach(key => {

    valueLabels[key].textContent = counts[key];

  });
}


// --------------------------------------------------
// CALCULAR EMISIONES
// --------------------------------------------------

function calculateEmissions() {

  let total = 0;

  Object.keys(counts).forEach(key => {

    total += counts[key] * carbonData[key].emitted;

  });

  return total;
}


// --------------------------------------------------
// CALCULAR ABSORCIONES
// --------------------------------------------------

function calculateAbsorptions() {

  let total = 0;

  Object.keys(counts).forEach(key => {

    total += counts[key] * carbonData[key].absorbed;

  });

  return total;
}


// --------------------------------------------------
// BALANCE
// --------------------------------------------------

function calculateBalance() {

  const emitted = calculateEmissions();
  const absorbed = calculateAbsorptions();

  return emitted - absorbed;
}


// --------------------------------------------------
// TEMPERATURA DIDÁCTICA
// --------------------------------------------------

function calculateTemperature(balance) {

  /*
    Esto NO es una ecuación climática real.

    Se utiliza una escala educativa para visualizar
    que un aumento del CO₂ atmosférico puede asociarse
    con un aumento de temperatura.

    Tomamos 0 como punto de referencia.
  */

  const baseline = 15;

  const temperatureIncrease = balance * 0.01;

  return baseline + temperatureIncrease;
}


// --------------------------------------------------
// ACTUALIZAR SIMULADOR
// --------------------------------------------------

function updateSimulation() {

  const emitted = calculateEmissions();
  const absorbed = calculateAbsorptions();

  const balance = emitted - absorbed;

  const temp = calculateTemperature(balance);

  totalEmitted.textContent = emitted;
  totalAbsorbed.textContent = absorbed;

  netBalance.textContent = balance;

  atmosphereCO2.textContent = Math.max(balance, 0);

  temperature.textContent =
    `${temp.toFixed(1)} °C`;

  // Color del balance
  if (balance > 0) {

    netBalance.style.color = "#e65100";

  } else if (balance < 0) {

    netBalance.style.color = "#2e7d32";

  } else {

    netBalance.style.color = "#1976d2";

  }

  updateLabels();

  updateAtmosphereVisual(balance);
}


// --------------------------------------------------
// EFECTO VISUAL DEL CO₂
// --------------------------------------------------

function updateAtmosphereVisual(balance) {

  const atmosphere = document.querySelector(".sky");

  /*
    A mayor balance positivo:
    - aumenta ligeramente el color rojizo
    - representa didácticamente un aumento del CO₂
  */

  const intensity =
    Math.min(Math.max(balance / 1000, 0), 0.35);

  atmosphere.style.background = `
    linear-gradient(
      #8dd9ff 0%,
      #c9efff 45%,
      rgba(255, ${247 - intensity * 120}, ${235 - intensity * 120}, 1) 45%,
      rgba(255, ${247 - intensity * 120}, ${235 - intensity * 120}, 1) 100%
    )
  `;
}


// --------------------------------------------------
// CONTROLES
// --------------------------------------------------

Object.keys(inputs).forEach(key => {

  inputs[key].addEventListener("input", event => {

    counts[key] =
      Number(event.target.value);

    updateSimulation();

  });

});


// --------------------------------------------------
// INFORMACIÓN DE CADA ELEMENTO
// --------------------------------------------------

function showInfo(type) {

  const data = carbonData[type];

  if (!data) return;

  const amount = counts[type];

  const emitted =
    amount * data.emitted;

  const absorbed =
    amount * data.absorbed;

  const net =
    emitted - absorbed;

  infoIcon.textContent = data.icon;

  infoTitle.textContent =
    data.name;

  infoDescription.textContent =
    data.description;

  infoStats.innerHTML = `

    <div>
      <strong>Cantidad:</strong>
      ${amount}
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

    <br>

    <div>
      ${data.explanation}
    </div>
  `;

  infoPanel.classList.add("visible");
}


// --------------------------------------------------
// CLICK SOBRE ELEMENTOS
// --------------------------------------------------

document.querySelectorAll("[data-info]").forEach(element => {

  element.addEventListener("click", () => {

    const type =
      element.dataset.info;

    showInfo(type);

  });

});


// --------------------------------------------------
// CERRAR PANEL
// --------------------------------------------------

closeInfo.addEventListener("click", () => {

  infoPanel.classList.remove("visible");

});


// --------------------------------------------------
// REINICIAR
// --------------------------------------------------

document.getElementById("resetBtn")
  .addEventListener("click", () => {

    counts = { ...defaultCounts };

    Object.keys(inputs).forEach(key => {

      inputs[key].value =
        counts[key];

    });

    infoPanel.classList.remove("visible");

    updateSimulation();

  });


// --------------------------------------------------
// INICIALIZACIÓN
// --------------------------------------------------

updateSimulation();