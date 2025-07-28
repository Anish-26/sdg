const questions = [
  {
    question: "1. What is Sustainable Development?",
    options: {
      a: "Economic growth at the expense of the environment",
      b: "Rapid industrialization",
      c: "Meeting present needs without compromising future generations"
    },
    correct: "c"
  },
  {
    question: "2. Which of the following is a goal of sustainable development?",
    options: {
      a: "Overusing natural resources",
      b: "Eradicating poverty",
      c: "Ignoring climate change"
    },
    correct: "b"
  },
  {
    question: "3. What does SDG stand for?",
    options: {
      a: "Sustainable Data Growth",
      b: "Sustainable Development Goals",
      c: "Social Development Goals"
    },
    correct: "b"
  },
  {
    question: "4. How many SDGs are defined by the UN?",
    options: {
      a: "10",
      b: "15",
      c: "17"
    },
    correct: "c"
  },
  {
    question: "5. What is an example of sustainable practice?",
    options: {
      a: "Burning fossil fuels",
      b: "Using plastic bags",
      c: "Using renewable energy"
    },
    correct: "c"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion(index) {
  answered = false;
  document.getElementById("next-btn").style.display = "none";
  const container = document.getElementById("question-container");
  container.innerHTML = "";

  const q = questions[index];
  const qDiv = document.createElement("div");

  const questionText = document.createElement("h3");
  questionText.innerText = q.question;
  qDiv.appendChild(questionText);

  for (let opt in q.options) {
    const label = document.createElement("label");
    label.style.display = "block";
    label.style.cursor = "pointer";
    label.innerHTML = `
      <input type="radio" name="q${index}" value="${opt}" onclick="selectAnswer('${opt}', '${q.correct}', this)">
      ${q.options[opt]}
    `;
    qDiv.appendChild(label);
  }

  container.appendChild(qDiv);

  // Update progress bar
  const percent = Math.round((index / questions.length) * 100);
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

function selectAnswer(selected, correct, input) {
  if (answered) return;

  answered = true;
  const labels = input.closest("#question-container").querySelectorAll("label");

  labels.forEach(label => {
    label.classList.remove("correct", "incorrect");
    const emoji = label.querySelector(".emoji");
    if (emoji) emoji.remove();
  });

  const label = input.parentElement;

  if (selected === correct) {
    score++;
    label.classList.add("correct");
    addEmoji(label, "🎉");
  } else {
    label.classList.add("incorrect");
    addEmoji(label, "😢");

    // Highlight correct one
    const correctInput = document.querySelector(`input[value='${correct}']`);
    if (correctInput) {
      correctInput.parentElement.classList.add("correct");
      addEmoji(correctInput.parentElement, "✅");
    }
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion(currentQuestion);
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById("question-container").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";
  const percent = Math.round((score / questions.length) * 100);
  document.getElementById("result").innerText = `🎯 You scored ${score} out of ${questions.length} (${percent}%)`;
  document.getElementById("progress-bar").style.width = `100%`;

  // Save score for next time
  localStorage.setItem("lastSDGQuizScore", score);
  showFinalResult(score);
}

function showFinalResult(score) {
  document.getElementById("result").innerText = `Your score: ${score}/8`;
  document.getElementById("tree-animation").style.display = "flex";
}

// Call showFinalResult(score) when the quiz ends
function addEmoji(label, symbol) {
  const emoji = document.createElement("span");
  emoji.className = "emoji";
  emoji.innerText = symbol;
  label.appendChild(emoji);
}

// Load first question
window.onload = function () {
  loadQuestion(currentQuestion);
  
};
