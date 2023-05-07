const log = console.log;

// Handle OverLay
const overlay = document.querySelector(".overlay");
const getOverlay = sessionStorage.getItem("overlay");

if (getOverlay === null) {
  sessionStorage.setItem("overlay", true);
} else if (getOverlay) {
  overlay.remove();
}

// Quiz Section
const [
  quizAnswers,
  quizAnswerContainer,
  quizQuestion,
  quizQuestionContainer,
  nextBtn,
] = [
  document.querySelectorAll(".answer"),
  document.querySelector(".quiz-answer-container"),
  document.querySelector(".quiz-question"),
  document.querySelector(".quiz"),
  document.querySelector(".next"),
];

let currentQuestionIndex = 0,
  score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetQuiz();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  quizQuestion.innerText = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.classList.add("answer");
    btn.innerText = answer.text;
    quizAnswerContainer.append(btn);

    if (answer.correct) {
      btn.dataset.correct = answer.correct;
    }
    btn.addEventListener("click", selectAnswer);
  });
};

const resetQuiz = () => {
  while (quizAnswerContainer.firstChild) {
    quizAnswerContainer.removeChild(quizAnswerContainer.firstChild);
  }
  nextBtn.style.display = "none";
};

const selectAnswer = (e) => {
  if (e.target.dataset.correct === "true") {
    e.target.classList.add("correct");
    score++;
  } else {
    e.target.classList.add("incorrect");
  }

  Array.from(quizAnswerContainer.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
    nextBtn.style.display = "block";
  });
};

const showScore = () => {
  resetQuiz();
  quizQuestion.innerText = `You scored ${score} out of ${questions.length}`;
  nextBtn.style.display = "block";
  nextBtn.innerText = "Restart Quiz";
};

const handleNextBtn = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
