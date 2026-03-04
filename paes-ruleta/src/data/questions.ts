export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // índice de la respuesta correcta
  explanation: string;
}

export interface Section {
  id: string;
  name: string;
  color: string;
  icon: string;
  questions: Question[];
}

export const sections: Section[] = [
  {
    id: "lectora",
    name: "Competencia\nLectora",
    color: "#E74C3C",
    icon: "📖",
    questions: [
      {
        id: 1,
        question:
          "En el enunciado: 'El protagonista, abrumado por las circunstancias, decidió abandonar su empresa'. ¿Qué significa 'abrumado'?",
        options: [
          "Entusiasmado",
          "Agobiado o superado",
          "Indiferente",
          "Motivado",
        ],
        correctAnswer: 1,
        explanation:
          "'Abrumado' significa sentirse agobiado, superado o con una carga excesiva que dificulta actuar.",
      },
      {
        id: 2,
        question:
          "¿Cuál es la función principal de un conector adversativo como 'sin embargo'?",
        options: [
          "Agregar información",
          "Indicar causa",
          "Introducir una idea opuesta o contraste",
          "Señalar consecuencia",
        ],
        correctAnswer: 2,
        explanation:
          "Los conectores adversativos como 'sin embargo', 'no obstante' o 'pero' introducen una idea que contrasta con lo dicho anteriormente.",
      },
      {
        id: 3,
        question:
          "En un texto argumentativo, ¿qué función cumple la tesis?",
        options: [
          "Resume el texto completo",
          "Presenta la postura que se defenderá",
          "Describe los hechos objetivamente",
          "Concluye la argumentación",
        ],
        correctAnswer: 1,
        explanation:
          "La tesis es la postura o punto de vista central que el autor plantea y que luego respaldará con argumentos a lo largo del texto.",
      },
    ],
  },
  {
    id: "matematica1",
    name: "Matemática\nM1",
    color: "#3498DB",
    icon: "🔢",
    questions: [
      {
        id: 4,
        question: "Si f(x) = 2x² - 3x + 1, ¿cuánto vale f(2)?",
        options: ["3", "5", "7", "1"],
        correctAnswer: 0,
        explanation:
          "f(2) = 2(2)² - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3",
      },
      {
        id: 5,
        question:
          "¿Cuál es la probabilidad de obtener un número par al lanzar un dado de 6 caras?",
        options: ["1/6", "1/3", "1/2", "2/3"],
        correctAnswer: 2,
        explanation:
          "Los números pares en un dado son {2, 4, 6}, es decir, 3 de 6 resultados posibles. P = 3/6 = 1/2.",
      },
      {
        id: 6,
        question:
          "Si el 20% de un número es 45, ¿cuál es el número?",
        options: ["180", "225", "200", "250"],
        correctAnswer: 1,
        explanation:
          "Si 20% de x = 45, entonces x = 45 / 0.20 = 225.",
      },
    ],
  },
  {
    id: "matematica2",
    name: "Matemática\nM2",
    color: "#9B59B6",
    icon: "📐",
    questions: [
      {
        id: 7,
        question:
          "¿Cuál es el valor de la hipotenusa en un triángulo rectángulo con catetos de 3 y 4?",
        options: ["6", "7", "5", "8"],
        correctAnswer: 2,
        explanation:
          "Por el teorema de Pitágoras: h² = 3² + 4² = 9 + 16 = 25, por lo tanto h = 5.",
      },
      {
        id: 8,
        question:
          "Si log₁₀(x) = 3, ¿cuál es el valor de x?",
        options: ["30", "300", "1000", "10000"],
        correctAnswer: 2,
        explanation:
          "log₁₀(x) = 3 significa que 10³ = x, por lo tanto x = 1000.",
      },
      {
        id: 9,
        question:
          "¿Cuánto mide el ángulo interior de un hexágono regular?",
        options: ["90°", "108°", "120°", "135°"],
        correctAnswer: 2,
        explanation:
          "Ángulo interior = (n-2) × 180° / n = (6-2) × 180° / 6 = 720° / 6 = 120°.",
      },
    ],
  },
  {
    id: "ciencias",
    name: "Ciencias",
    color: "#27AE60",
    icon: "🔬",
    questions: [
      {
        id: 10,
        question: "¿Cuál es la unidad básica de la vida?",
        options: ["El átomo", "La molécula", "La célula", "El tejido"],
        correctAnswer: 2,
        explanation:
          "La célula es la unidad estructural y funcional básica de todos los seres vivos.",
      },
      {
        id: 11,
        question:
          "¿Qué tipo de enlace químico se forma entre un metal y un no metal?",
        options: [
          "Enlace covalente",
          "Enlace iónico",
          "Enlace metálico",
          "Enlace de hidrógeno",
        ],
        correctAnswer: 1,
        explanation:
          "El enlace iónico se forma por transferencia de electrones entre un metal (que pierde electrones) y un no metal (que los gana).",
      },
      {
        id: 12,
        question:
          "La segunda ley de Newton establece que F = m × a. Si se duplica la masa y se mantiene la fuerza, ¿qué ocurre con la aceleración?",
        options: [
          "Se duplica",
          "Se reduce a la mitad",
          "Se mantiene igual",
          "Se cuadruplica",
        ],
        correctAnswer: 1,
        explanation:
          "Si F = m × a, entonces a = F/m. Al duplicar m con F constante: a' = F/(2m) = a/2. La aceleración se reduce a la mitad.",
      },
    ],
  },
  {
    id: "historia",
    name: "Historia y\nCs. Sociales",
    color: "#F39C12",
    icon: "🏛️",
    questions: [
      {
        id: 13,
        question:
          "¿En qué año se realizó el primer gobierno de Arturo Alessandri Palma en Chile?",
        options: ["1910", "1920", "1925", "1932"],
        correctAnswer: 1,
        explanation:
          "Arturo Alessandri Palma asumió su primer mandato presidencial en 1920, siendo un hito en la historia política chilena.",
      },
      {
        id: 14,
        question:
          "¿Qué principio establece que todos los seres humanos nacen libres e iguales en dignidad y derechos?",
        options: [
          "La Constitución chilena",
          "La Declaración Universal de Derechos Humanos",
          "El Tratado de Versalles",
          "La Carta de la OEA",
        ],
        correctAnswer: 1,
        explanation:
          "El Artículo 1 de la Declaración Universal de Derechos Humanos (1948) establece este principio fundamental.",
      },
      {
        id: 15,
        question:
          "¿Cuál fue la principal consecuencia económica del salitre para Chile a fines del siglo XIX?",
        options: [
          "Disminución del comercio exterior",
          "Gran crecimiento de ingresos fiscales",
          "Pérdida de territorios",
          "Aislamiento internacional",
        ],
        correctAnswer: 1,
        explanation:
          "La explotación del salitre generó enormes ingresos fiscales para Chile, financiando obras públicas y modernización del Estado.",
      },
    ],
  },
];
