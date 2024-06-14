const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Berlin", "Paris", "Madrid"],
    correct: "Paris",
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    correct: "4",
  },
  {
    question: "What is the boiling point of water?",
    choices: ["90°C", "100°C", "110°C", "120°C"],
    correct: "100°C",
  },
];

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const gifContainer = document.getElementById("gif-container");
const submitButton = document.getElementById("submit");

const passingScore = 2; // Define a threshold for passing the quiz

function buildQuiz() {
  const output = [];
  quizData.forEach((currentQuestion, questionNumber) => {
    const choices = [];
    for (let choice in currentQuestion.choices) {
      choices.push(
        `<label>
                    <input type="radio" name="question${questionNumber}" value="${currentQuestion.choices[choice]}">
                    ${currentQuestion.choices[choice]}
                </label>`
      );
    }
    output.push(
      `<div class="question">${currentQuestion.question}</div>
            <div class="answers">${choices.join("")}</div>`
    );
  });
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;

  quizData.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correct) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "green";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });

  resultsContainer.innerHTML = `You got ${numCorrect} out of ${quizData.length} right`;

  if (numCorrect >= passingScore) {
    gifContainer.innerHTML = '<img src="win.gif" alt="You win!" width="300">';
  } else {
    gifContainer.innerHTML = '<img src="lose.gif" alt="You lose!" width="300">';
  }
}

buildQuiz();

submitButton.addEventListener("click", showResults);
