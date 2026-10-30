


import { initializeApp } from
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBs4ogLcPAjkmRljh72q8lG2aI140avkNI",
  authDomain: "brasil-44f63.firebaseapp.com",
  projectId: "brasil-44f63",
  storageBucket: "brasil-44f63.firebasestorage.app",
  messagingSenderId: "482497227382",
  appId: "1:482497227382:web:cae158a5a786ae5f8a8d57",
  measurementId: "G-NX9T2TS98G"
};

let db = null;
let firebaseReady = false;



const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const connectionStatus =
  document.getElementById("connection-status");

const rankingStatus =
  document.getElementById("ranking-status");

const rankingList =
  document.getElementById("ranking-list");

const questionCounter =
  document.getElementById("question-counter");

const scoreElement =
  document.getElementById("score");

const progressBar =
  document.getElementById("progress-bar");

const categoryElement =
  document.getElementById("category");

const questionText =
  document.getElementById("question-text");

const answersElement =
  document.getElementById("answers");

const feedback =
  document.getElementById("feedback");

const finalScore =
  document.getElementById("final-score");

const resultTitle =
  document.getElementById("result-title");

const resultMessage =
  document.getElementById("result-message");

const saveStatus =
  document.getElementById("save-status");



const rounds = [



  {
    title: "Explorador de Brasil",
    difficulty: "Fácil",

    questions: [
      {
        category: "GEOGRAFÍA",
        question: "¿Cuál es la capital de Brasil?",
        answers: [
          "Río de Janeiro",
          "Brasilia",
          "São Paulo",
          "Salvador"
        ],
        correct: 1
      },
      {
        category: "CULTURA",
        question: "¿Cuál es el idioma oficial de Brasil?",
        answers: [
          "Español",
          "Inglés",
          "Portugués",
          "Francés"
        ],
        correct: 2
      },
      {
        category: "NATURALEZA",
        question: "¿Qué gran selva se encuentra en Brasil?",
        answers: [
          "Selva Negra",
          "Amazonía",
          "Taiga",
          "Congo"
        ],
        correct: 1
      },
      {
        category: "CULTURA",
        question: "¿Cómo se llama la famosa fiesta brasileña?",
        answers: [
          "Oktoberfest",
          "Carnaval",
          "La Tomatina",
          "Holi"
        ],
        correct: 1
      },
      {
        category: "FÚTBOL",
        question: "¿De qué color es tradicionalmente la camiseta principal de Brasil?",
        answers: [
          "Verde",
          "Azul",
          "Amarilla",
          "Roja"
        ],
        correct: 2
      },
      {
        category: "GEOGRAFÍA",
        question: "¿Qué océano baña la costa de Brasil?",
        answers: [
          "Índico",
          "Atlántico",
          "Ártico",
          "Pacífico"
        ],
        correct: 1
      },
      {
        category: "CULTURA",
        question: "¿Qué baile es muy representativo de Brasil?",
        answers: [
          "Samba",
          "Flamenco",
          "Tango",
          "Vals"
        ],
        correct: 0
      },
      {
        category: "GEOGRAFÍA",
        question: "¿En qué continente se encuentra Brasil?",
        answers: [
          "Europa",
          "África",
          "Asia",
          "América del Sur"
        ],
        correct: 3
      },
      {
        category: "NATURALEZA",
        question: "¿Cuál de estos animales vive en la Amazonía?",
        answers: [
          "Jaguar",
          "Oso polar",
          "Canguro",
          "Pingüino emperador"
        ],
        correct: 0
      },
      {
        category: "CULTURA",
        question: "¿Qué figura aparece en el centro de la bandera de Brasil?",
        answers: [
          "Una estrella roja",
          "Un círculo azul con estrellas",
          "Una luna",
          "Un sol amarillo"
        ],
        correct: 1
      }
    ]
  },



  {
    title: "Experto en Brasil",
    difficulty: "Intermedio",

    questions: [
      {
        category: "AMAZONÍA",
        question: "¿Qué río atraviesa una enorme parte de la cuenca amazónica?",
        answers: [
          "Río Amazonas",
          "Río Paraná",
          "Río São Francisco",
          "Río Uruguay"
        ],
        correct: 0
      },
      {
        category: "GEOGRAFÍA",
        question: "¿Cuál es el estado brasileño cuya capital es Manaos?",
        answers: [
          "Pará",
          "Amazonas",
          "Acre",
          "Rondônia"
        ],
        correct: 1
      },
      {
        category: "HISTORIA",
        question: "¿En qué año declaró Brasil su independencia de Portugal?",
        answers: [
          "1789",
          "1808",
          "1822",
          "1889"
        ],
        correct: 2
      },
      {
        category: "TRADICIONES",
        question: "¿Qué instrumento de percusión se asocia con la capoeira?",
        answers: [
          "Berimbau",
          "Bandoneón",
          "Castañuelas",
          "Gaita escocesa"
        ],
        correct: 0
      },
      {
        category: "GEOGRAFÍA",
        question: "¿Cuál es el estado brasileño más grande por superficie?",
        answers: [
          "Bahía",
          "Minas Gerais",
          "Amazonas",
          "Paraná"
        ],
        correct: 2
      },
      {
        category: "FÚTBOL",
        question: "¿Qué selección perdió contra Brasil en la final del Mundial de 2002?",
        answers: [
          "Alemania",
          "Italia",
          "Francia",
          "Argentina"
        ],
        correct: 0
      },
      {
        category: "NATURALEZA",
        question: "¿Qué humedal tropical se extiende por Brasil y países vecinos?",
        answers: [
          "Pantanal",
          "Atacama",
          "Pampa húmeda",
          "Llanura del Ganges"
        ],
        correct: 0
      },
      {
        category: "CULTURA",
        question: "¿Qué género musical brasileño se originó en Río de Janeiro y tiene un ritmo suave?",
        answers: [
          "Samba-canção",
          "Polca",
          "Flamenco",
          "Reggae jamaicano"
        ],
        correct: 0
      },
      {
        category: "HISTORIA",
        question: "¿Qué ciudad fue capital de Brasil antes de Brasilia?",
        answers: [
          "Curitiba",
          "Río de Janeiro",
          "Recife",
          "Fortaleza"
        ],
        correct: 1
      },
      {
        category: "GEOGRAFÍA",
        question: "¿Cuál de estos países NO comparte frontera con Brasil?",
        answers: [
          "Perú",
          "Chile",
          "Bolivia",
          "Colombia"
        ],
        correct: 1
      }
    ]
  },

 
  {
    title: "Maestro de Brasil",
    difficulty: "Difícil",

    questions: [
      {
        category: "HISTORIA",
        question: "¿Qué ley de 1888 abolió oficialmente la esclavitud en Brasil?",
        answers: [
          "Ley de Vientre Libre",
          "Ley Áurea",
          "Ley de Reforma",
          "Ley de Independencia"
        ],
        correct: 1
      },
      {
        category: "POLÍTICA",
        question: "¿Qué forma de gobierno adoptó Brasil tras el fin de la monarquía en 1889?",
        answers: [
          "Monarquía parlamentaria",
          "República",
          "Confederación",
          "Imperio federal"
        ],
        correct: 1
      },
      {
        category: "ECONOMÍA",
        question: "¿Cuál es la moneda oficial de Brasil?",
        answers: [
          "Peso brasileño",
          "Real brasileño",
          "Cruzeiro actual",
          "Escudo"
        ],
        correct: 1
      },
      {
        category: "GEOGRAFÍA",
        question: "¿Qué línea imaginaria atraviesa el norte de Brasil?",
        answers: [
          "Trópico de Capricornio",
          "Círculo Polar Ártico",
          "Línea del Ecuador",
          "Meridiano de Greenwich"
        ],
        correct: 2
      },
      {
        category: "GEOGRAFÍA",
        question: "¿Cuál es el punto más alto de Brasil?",
        answers: [
          "Pico da Neblina",
          "Pico Paraná",
          "Monte Roraima",
          "Pico da Bandeira"
        ],
        correct: 0
      },
      {
        category: "HISTORIA",
        question: "¿Quién fue el primer presidente de Brasil?",
        answers: [
          "Getúlio Vargas",
          "Deodoro da Fonseca",
          "Juscelino Kubitschek",
          "Dom Pedro II"
        ],
        correct: 1
      },
      {
        category: "ECONOMÍA",
        question: "¿Qué producto agrícola ha sido históricamente importante para las exportaciones brasileñas?",
        answers: [
          "Café",
          "Olivas",
          "Té verde exclusivamente",
          "Azafrán"
        ],
        correct: 0
      },
      {
        category: "GEOGRAFÍA",
        question: "¿Qué gran meseta ocupa buena parte del centro y sureste de Brasil?",
        answers: [
          "Meseta Brasileña",
          "Meseta del Tíbet",
          "Meseta del Decán",
          "Meseta de Anatolia"
        ],
        correct: 0
      },
      {
        category: "HISTORIA",
        question: "¿En qué año se inauguró Brasilia como nueva capital del país?",
        answers: [
          "1945",
          "1950",
          "1960",
          "1975"
        ],
        correct: 2
      },
      {
        category: "POLÍTICA",
        question: "¿Cómo se llama el poder legislativo federal de Brasil, compuesto por la Cámara de Diputados y el Senado Federal?",
        answers: [
          "Congreso Nacional",
          "Consejo Imperial",
          "Asamblea de Estados",
          "Tribunal Supremo"
        ],
        correct: 0
      }
    ]
  }
];

let playerName = "";
let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;
let gameFinished = false;
let savingResult = false;
let awaitingNextRound = false;

// Indicador de ronda creado desde JavaScript.
const roundIndicator = document.createElement("p");

roundIndicator.id = "round-indicator";
roundIndicator.className = "round-indicator";
roundIndicator.setAttribute("aria-live", "polite");

if (questionCounter && questionCounter.parentNode) {
  questionCounter.parentNode.insertBefore(
    roundIndicator,
    questionCounter
  );
}



function configurarFirebase() {
  const configIncompleta =
    Object.values(firebaseConfig).some(value =>
      !value || String(value).startsWith("TU_")
    );

  if (configIncompleta) {
    connectionStatus.textContent =
      "Configura Firebase en app.js para comenzar.";

    connectionStatus.className = "status error";

    rankingStatus.textContent =
      "El ranking necesita una conexión con Firebase.";

    return;
  }

  try {
    const app = initializeApp(firebaseConfig);

    db = getFirestore(app);

    connectionStatus.textContent =
      "Conectando con Firebase...";

    connectionStatus.className = "status";

    escucharRanking();

  } catch (error) {
    console.error("Error al iniciar Firebase:", error);

    connectionStatus.textContent =
      "No se pudo iniciar Firebase. Revisa la configuración.";

    connectionStatus.className = "status error";
  }
}


startBtn.addEventListener("click", iniciarJuego);

function iniciarJuego() {
  const nombre = playerNameInput.value.trim();

  if (!nombre) {
    connectionStatus.textContent =
      "Escribe tu nombre antes de comenzar.";

    playerNameInput.focus();
    return;
  }

  if (nombre.length > 20) {
    connectionStatus.textContent =
      "El nombre debe tener máximo 20 caracteres.";

    return;
  }

  playerName = nombre;

  currentRound = 0;
  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  answered = false;
  gameFinished = false;
  awaitingNextRound = false;

  scoreElement.textContent = "0";

  startScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;

  mostrarPregunta();
}


function mostrarPregunta() {
  answered = false;
  awaitingNextRound = false;

  const ronda = rounds[currentRound];
  const pregunta = ronda.questions[currentQuestion];

  roundIndicator.textContent =
    `Ronda ${currentRound + 1} de 3 — ` +
    `${ronda.title} (${ronda.difficulty})`;

  questionCounter.textContent =
    `Pregunta ${currentQuestion + 1} de ${ronda.questions.length}`;

  categoryElement.textContent = pregunta.category;
  questionText.textContent = pregunta.question;

  scoreElement.textContent = score;

  progressBar.style.width =
    `${(currentQuestion / ronda.questions.length) * 100}%`;

  feedback.textContent = "";
  feedback.className = "feedback";

  answersElement.replaceChildren();

  nextBtn.hidden = true;

  pregunta.answers.forEach((respuesta, index) => {
    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "answer-btn";

    boton.textContent =
      `${String.fromCharCode(65 + index)}. ${respuesta}`;

    boton.addEventListener("click", () => {
      comprobarRespuesta(index, boton);
    });

    answersElement.appendChild(boton);
  });
}



function comprobarRespuesta(
  indiceSeleccionado,
  botonSeleccionado
) {
  if (answered || gameFinished || awaitingNextRound) {
    return;
  }

  answered = true;

  const pregunta =
    rounds[currentRound].questions[currentQuestion];

  const botones =
    answersElement.querySelectorAll(".answer-btn");

  botones.forEach((boton, indice) => {
    boton.disabled = true;

    if (indice === pregunta.correct) {
      boton.classList.add("correct");
    }
  });

  if (indiceSeleccionado === pregunta.correct) {
    score += 10;
    correctAnswers++;

    feedback.textContent =
      "¡Respuesta correcta! +10 puntos 🎉";

    feedback.className = "feedback good";

  } else {
    botonSeleccionado.classList.add("incorrect");

    feedback.textContent =
      `Respuesta incorrecta. La respuesta correcta es: ` +
      `${pregunta.answers[pregunta.correct]}.`;

    feedback.className = "feedback bad";
  }

  scoreElement.textContent = score;

  progressBar.style.width =
    `${((currentQuestion + 1) /
      rounds[currentRound].questions.length) * 100}%`;

  const ultimaPregunta =
    currentQuestion ===
    rounds[currentRound].questions.length - 1;

  nextBtn.textContent = ultimaPregunta
    ? (
        currentRound === rounds.length - 1
          ? "Ver resultado 🏆"
          : "Finalizar ronda →"
      )
    : "Siguiente pregunta →";

  nextBtn.hidden = false;
}



nextBtn.addEventListener("click", siguientePregunta);

function siguientePregunta() {
  if (gameFinished) {
    return;
  }

  // Comenzar la ronda siguiente después de la transición.
  if (awaitingNextRound) {
    currentRound++;
    currentQuestion = 0;

    mostrarPregunta();
    return;
  }

  if (!answered) {
    return;
  }

  const ultimaPregunta =
    currentQuestion ===
    rounds[currentRound].questions.length - 1;

  if (!ultimaPregunta) {
    currentQuestion++;

    mostrarPregunta();
    return;
  }

  if (currentRound < rounds.length - 1) {
    mostrarTransicionRonda();

  } else {
    finalizarJuego();
  }
}



function mostrarTransicionRonda() {
  awaitingNextRound = true;
  answered = false;

  const rondaTerminada = rounds[currentRound];
  const siguienteRonda = rounds[currentRound + 1];

  roundIndicator.textContent =
    `Ronda ${currentRound + 1} completada`;

  questionCounter.textContent = "¡Buen trabajo!";

  categoryElement.textContent = "RONDA COMPLETADA";

  questionText.textContent =
    `¡Terminaste ${rondaTerminada.title}! ` +
    `Prepárate para ${siguienteRonda.title}, ` +
    `nivel ${siguienteRonda.difficulty.toLowerCase()}.`;

  answersElement.replaceChildren();

  feedback.textContent =
    `Puntaje acumulado: ${score} puntos. ¡Sigue adelante! 🇧🇷`;

  feedback.className = "feedback good";

  progressBar.style.width = "100%";

  nextBtn.textContent =
    `Comenzar ronda ${currentRound + 2} →`;

  nextBtn.hidden = false;
}


async function finalizarJuego() {
  if (gameFinished) {
    return;
  }

  gameFinished = true;

  quizScreen.hidden = true;
  resultScreen.hidden = false;

  finalScore.textContent = score;

  if (score === 300) {
    resultTitle.textContent =
      "¡Maestro absoluto de Brasil! 🏆🇧🇷";

  } else if (score >= 220) {
    resultTitle.textContent =
      "¡Conocimiento extraordinario! 🎉";

  } else if (score >= 150) {
    resultTitle.textContent =
      "¡Excelente desafío! 👏";

  } else if (score >= 80) {
    resultTitle.textContent =
      "¡Vas por buen camino! 💪";

  } else {
    resultTitle.textContent =
      "¡Sigue explorando Brasil! 🌎";
  }

  resultMessage.textContent =
    `Respondiste correctamente ${correctAnswers} de 30 ` +
    `preguntas y acumulaste ${score} de 300 puntos.`;

  await guardarResultado();
}



async function guardarResultado() {
  if (!firebaseReady || !db) {
    saveStatus.textContent =
      "No se guardó el resultado porque Firebase no está conectado.";

    saveStatus.className = "status error";

    return;
  }

  savingResult = true;

  saveStatus.textContent =
    "Guardando resultado en Firebase...";

  saveStatus.className = "status";

  try {
    await addDoc(collection(db, "resultados"), {
      nombre: playerName,
      puntos: score,
      correctas: correctAnswers,
      totalPreguntas: 30,
      rondasCompletadas: 3,
      fecha: serverTimestamp()
    });

    saveStatus.textContent =
      "¡Tu resultado se guardó correctamente!";

    saveStatus.className = "status success";

  } catch (error) {
    console.error(
      "Error al guardar el resultado:",
      error
    );

    saveStatus.textContent =
      "No se pudo guardar el resultado. Revisa las reglas de Firestore.";

    saveStatus.className = "status error";

  } finally {
    savingResult = false;
  }
}



restartBtn.addEventListener("click", () => {
  if (savingResult) {
    return;
  }

  resultScreen.hidden = true;
  quizScreen.hidden = true;
  startScreen.hidden = false;

  playerNameInput.value = playerName;

  connectionStatus.textContent = firebaseReady
    ? "Conectado con Firebase. ¡Puedes jugar!"
    : "Revisa la conexión con Firebase.";

  playerNameInput.focus();
});



function escucharRanking() {
  const resultadosRef = collection(db, "resultados");

  onSnapshot(
    resultadosRef,

    (snapshot) => {
      firebaseReady = true;

      connectionStatus.textContent =
        "¡Conexión con Firebase establecida!";

      connectionStatus.className = "status success";

      rankingStatus.textContent =
        "Ranking actualizado en tiempo real.";

      const resultados = snapshot.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
      }));

      // Ordenar de mayor a menor puntuación.
      resultados.sort((a, b) => {
        const diferencia =
          (b.puntos || 0) - (a.puntos || 0);

        if (diferencia !== 0) {
          return diferencia;
        }

        const fechaA = a.fecha?.toMillis?.() || 0;
        const fechaB = b.fecha?.toMillis?.() || 0;

        return fechaA - fechaB;
      });

      rankingList.replaceChildren();

      if (resultados.length === 0) {
        rankingStatus.textContent =
          "Todavía no hay resultados. ¡Sé el primero en jugar!";

        return;
      }

      resultados.slice(0, 10).forEach((resultado, indice) => {
        const elemento = document.createElement("li");

        const fila = document.createElement("div");
        fila.className = "ranking-row";

        const nombre = document.createElement("span");
        nombre.className = "player-name";

        const medallas = ["🥇", "🥈", "🥉"];

        nombre.textContent =
          `${medallas[indice] || "🏅"} ` +
          `${resultado.nombre || "Jugador"}`;

        const puntos = document.createElement("span");
        puntos.className = "player-points";

        puntos.textContent =
          `${resultado.puntos || 0} pts`;

        fila.append(nombre, puntos);

        elemento.appendChild(fila);

        rankingList.appendChild(elemento);
      });
    },

    (error) => {
      console.error("Error en el ranking:", error);

      firebaseReady = false;

      connectionStatus.textContent =
        "Error de conexión con Firebase.";

      connectionStatus.className = "status error";

      rankingStatus.textContent =
        "No se pudo cargar el ranking. Revisa las reglas de Firestore.";
    }
  );
}



configurarFirebase();