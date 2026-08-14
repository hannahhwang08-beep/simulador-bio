// Diccionario de Datos Científicos del Ciclo del Carbono
const biologyData = {
    fabrica: {
        title: "Emisiones de Complejos Industriales",
        tag: "emision",
        tagText: "Emisión Antrópica Directa",
        importance: "Las industrias queman combustibles fósiles (carbón, derivados de petróleo), liberando en pocos segundos carbono inorgánico que estuvo confinado bajo tierra de forma segura durante más de 300 millones de años.",
        influence: "El proceso químico combina hidrocarburos con oxígeno atmosférico mediante combustión, rompiendo por completo los sumideros del ciclo dinámico natural.",
        environmental: "Es la fuerza rectora detrás del aumento drástico del efecto invernadero antropogénico y la desestabilización climática actual.",
        particles: { from: {x: 10, y: 38}, to: {x: 50, y: 12}, color: "emit" }
    },
    auto: {
        title: "Emisiones por Transporte Público y Privado",
        tag: "emision",
        tagText: "Combustión Móvil Continua",
        importance: "Los motores de combustión interna de los automóviles oxidan gasolinas o diésel, transformándolos inmediatamente en dióxido de carbono gaseoso (CO₂) y vapor de agua.",
        influence: "Aporta un flujo difuso pero masivo de carbono directo hacia el compartimiento de la atmósfera a nivel superficial de la isla.",
        environmental: "Incrementa los niveles locales de contaminación en las capas bióticas bajas del aire urbano, alterando los balances gaseosos locales.",
        particles: { from: {x: 15, y: 48}, to: {x: 50, y: 12}, color: "emit" }
    },
    bosque: {
        title: "Fijación Vegetal (Fotosíntesis Terrestre)",
        tag: "absorcion",
        tagText: "Sumidero Biótico Crítico",
        importance: "Los árboles y plantas terrestres actúan como los pulmones metabólicos fijos de la isla. Capturan activamente el carbono gaseoso (CO₂) libre del aire.",
        influence: "Mediante el mecanismo enzimático de la fotosíntesis, utilizan la energía fotónica solar para romper el CO₂, liberando el oxígeno gaseoso (O₂) y reteniendo la molécula de carbono para biosintetizar glucosa y celulosa (madera).",
        environmental: "La deforestación provoca la pérdida masiva de este escudo regulador; al talarse o quemarse, todo el carbono almacenado en los troncos regresa a la atmósfera.",
        particles: { from: {x: 50, y: 12}, to: {x: 34, y: 40}, color: "absorb" }
    },
    ganado: {
        title: "Ganadería e Intercambio Biológico",
        tag: "emision",
        tagText: "Emisión por Respiración y Fermentación",
        importance: "Los animales terrestres participan mediante la respiración celular (liberando CO₂ metabólico) y la digestión de materia orgánica compleja.",
        influence: "Los rumiantes (vacas) albergan bacterias metanogénicas en su sistema digestivo. Generan gas Metano (CH₄) mediante fermentación entérica, el cual es expulsado a la atmósfera. El CH₄ es un compuesto de carbono mucho más potente atrapando calor que el CO₂.",
        environmental: "El auge desmedido de la ganadería intensiva a escala global sobrecarga la atmósfera con gases de efecto invernadero pesados.",
        particles: { from: {x: 48, y: 46}, to: {x: 50, y: 12}, color: "emit" }
    },
    ballena_playa: {
        title: "Ballena Varada en Playa (Descomposición)",
        tag: "emision",
        tagText: "Reciclaje Biológico de Superficie",
        importance: "Cuando un gran mamífero marino muere y queda varado en la playa, su inmensa masa orgánica rica en carbono queda expuesta a la atmósfera superior.",
        influence: "Las bacterias descomponedoras aeróbicas metabolizan los tejidos blandos del animal. Rompen las proteínas y grasas, liberando volúmenes considerables de gas CO₂ y gases metabólicos directamente hacia el aire de la costa.",
        environmental: "Ilustra el reciclaje rápido de nutrientes superficiales. Si se descompone al aire libre, su carbono no es secuestrado, sino reciclado de inmediato en la atmósfera gaseosa.",
        particles: { from: {x: 72, y: 55}, to: {x: 50, y: 12}, color: "emit" }
    },
    algas: {
        title: "Fijación por Algas Marinas y Fitoplancton",
        tag: "absorcion",
        tagText: "El Mayor Sumidero Biológico Global",
        importance: "Las macroalgas y el fitoplancton en los océanos realizan más del 50% de la actividad fotosintética total del planeta Tierra.",
        influence: "Absorben el carbono disuelto en el agua superficial marina proveniente del intercambio con el aire, fijándolo en cadenas orgánicas subacuáticas y sustentando toda la red trófica marina.",
        environmental: "El calentamiento excesivo del agua destruye las poblaciones de algas, colapsando el principal mecanismo natural de captura de carbono del planeta.",
        particles: { from: {x: 50, y: 12}, to: {x: 64, y: 76}, color: "absorb" }
    },
    ballena_fondo: {
        title: "Caída de Ballenas (Secuestro Biológico Profundo)",
        tag: "almacen",
        tagText: "Sumidero a Escala Geológica",
        importance: "Cuando una ballena muere de forma natural en alta mar, su cuerpo se hunde al fondo del océano, un fenómeno biológico clave denominado *Caída de Ballenas* (*Whale Fall*).",
        influence: "El cadáver transporta de golpe toneladas de carbono orgánico puro hacia las profundidades abisales. Allí, es consumido lentamente por ecosistemas bentónicos y sus restos óseos quedan cubiertos por sedimentos, aislando el carbono de la atmósfera por miles o millones de años.",
        environmental: "Los cetáceos grandes son amortiguadores biológicos vivos del calentamiento global; una sola ballena secuestra el equivalente a miles de árboles.",
        particles: { from: {x: 64, y: 76}, to: {x: 32, y: 80}, color: "absorb" }
    },
    co2_fondo: {
        title: "Carbono Concentrado e Inorgánico en el Fondo",
        tag: "almacen",
        tagText: "Bomba Físico-Química de Solubilidad",
        importance: "El fondo marino funciona como un gigantesco almacén inorgánico de carbono donde el CO₂ disuelto se encuentra a altas presiones y bajas temperaturas.",
        influence: "El carbono inorgánico precipita en forma de carbonato de calcio (CaCO₃), acumulándose en el lecho marino profundo e integrando rocas sedimentarias sedimentadas.",
        environmental: "Al aumentar los niveles de CO₂ atmosférico, el mar absorbe más gas de lo normal, provocando la **acidificación de los océanos**. Esto debilita las conchas de moluscos y corales.",
        particles: { from: {x: 32, y: 80}, to: {x: 12, y: 86}, color: "absorb" }
    }
};

const nodes = document.querySelectorAll('.element-node');
const defaultMsg = document.getElementById('default-msg');
const activeContent = document.getElementById('active-content');

const infoTitle = document.getElementById('info-title');
const infoTag = document.getElementById('info-tag');
const infoImportance = document.getElementById('info-importance');
const infoInfluence = document.getElementById('info-influence');
const infoEnvironmental = document.getElementById('info-environmental');
const particlesContainer = document.getElementById('particles');

// Manejo de Interacciones con un Clic
nodes.forEach(node => {
    node.addEventListener('click', () => {
        const key = node.getAttribute('data-step');
        const data = biologyData[key];
        
        if (data) {
            // Actualizar estados visuales de los nodos activos
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            
            // Alternar visibilidad de paneles
            defaultMsg.classList.add('hidden');
            activeContent.classList.remove('hidden');
            
            // Inyectar textos biológicos validados
            infoTitle.textContent = data.title;
            infoImportance.textContent = data.importance;
            infoInfluence.textContent = data.influence;
            infoEnvironmental.textContent = data.environmental;
            
            // Configurar etiqueta visual del proceso
            infoTag.className = `flow-tag ${data.tag}`;
            infoTag.textContent = data.tagText;
            
            // Disparar las micro-partículas de CO2
            animateCarbonStream(data.particles);
        }
    });
});

// Animador Dinámico de Flujos de Partículas de Carbono
function animateCarbonStream(config) {
    particlesContainer.innerHTML = '';
    const numParticles = 10;
    
    for (let i = 0; i < numParticles; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (config.color === 'absorb') dot.classList.add('absorb');
        
        dot.style.left = `${config.from.x}%`;
        dot.style.top = `${config.from.y}%`;
        particlesContainer.appendChild(dot);
        
        const delay = i * 150;
        const duration = 1200 + Math.random() * 400;
        
        dot.animate([
            { left: `${config.from.x}%`, top: `${config.from.y}%`, opacity: 0.9, transform: 'scale(1)' },
            { opacity: 1, transform: 'scale(1.2)', offset: 0.3 },
            { left: `${config.to.x}%`, top: `${config.to.y}%`, opacity: 0, transform: 'scale(0.5)' }
        ], {
            duration: duration,
            delay: delay,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    }
}
