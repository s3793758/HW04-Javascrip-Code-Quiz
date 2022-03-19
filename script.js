//DOM
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const qustionElement = document.getElementById("questions");
const answerButtonElement = document.getElementById("answer-buttons");
const scoreHeading = document.getElementById("score-heading");
const timer = document.getElementById("timer");
const buttons = document.querySelectorAll(".btns");
const highScoreButton = document.getElementById("high-Score-btn");

//
const restartButton = document.getElementById("Restart-Quiz-btn");

//GLOBAL
let shuffledQuestions, currentQuestionIndex, runningTimer;
let timerValue = 90;
let userScore = 0;
let highScore = 0;
let playerName = "NoName";
const CORRECT_ANSWER_SCORE_INCREASE = 1;
const WRONG_ANSWER_TIME_DECREASE = 5;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
highScoreButton.addEventListener("click", HighscoreScreen);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  // debugging
  //console.log("start");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  scoreHeading.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  startClock();
}

function restartGame() {
  // debugging
  //console.log("start");
  timerValue = 90;
  userScore = 0;

  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  scoreHeading.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  scoreHeading.classList.remove("correct");
  scoreHeading.classList.remove("wrong");
  score - heading;
  //startClock();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  scoreHeading.classList.remove("hide");
  document.getElementById("score").textContent = userScore;
  console.log({ question });
  qustionElement.innerText = question.question;
  // let result = "";
  answerButtonElement.innerHTML = "";
  question.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "btn answer";
    btn.textContent = answer.text;
    btn.addEventListener("click", (e) => {
      selectAnswer(e, question);
    });
    answerButtonElement.append(btn);
    // result += `<button class="btn answer">${answer.text}</button>`;
  });
  // answerButtonElement.innerHTML = result;
  // const clickHandler = function (e) {

  // };
  // answerButtonElement
  //   .querySelectorAll("button.answer")
  //   .forEach(function (item) {
  //     console.log(item);
  //     item.addEventListener("click", clickHandler);
  //   });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

//reset game

function selectAnswer(e, question) {
  const selectedButton = e.target;
  const isCorrectAnswer = selectedButton.textContent == question.answer;

  if (isCorrectAnswer) {
    userScore += CORRECT_ANSWER_SCORE_INCREASE;
    scoreHeading.classList.add("correct");
    scoreHeading.classList.remove("wrong");
    moveToNextQuestion();
  } else {
    timerValue -= WRONG_ANSWER_TIME_DECREASE;
    scoreHeading.classList.remove("correct");
    scoreHeading.classList.add("wrong");
    moveToNextQuestion();
  }
}

function moveToNextQuestion() {
  const nextQuestionIndex = currentQuestionIndex + 1;
  const hasMoreQuestions = nextQuestionIndex < questions.length;
  if (hasMoreQuestions) {
    const nextQuestion = questions[nextQuestionIndex];
    currentQuestionIndex++;
    showQuestion(nextQuestion);
  } else {
    // game ends?
    questionContainerElement.classList.add("hide");
    scoreHeading.classList.remove("hide");

    // set high score value
    if (userScore > highScore) {
      highScore = userScore;
    }

    playerName = prompt("Please enter your name");
    document.querySelector("#score").innerText =
      playerName + " -> " + highScore;
  }
}

function HighscoreScreen() {
  questionContainerElement.classList.add("hide");
  scoreHeading.classList.remove("hide");
  document.querySelector("#score").innerText = playerName + " -> " + highScore;
}

//colour indcation right or wrong
function clearStatusClass(element) {
  // console.log(element)
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "what is 2 + 2",
    answers: [{ text: "4" }, { text: "44" }],
    answer: "4",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>" },
      { text: "<javascript>" },
      { text: "<scripting>" },
      { text: "<script>" },
    ],
    answer: "<script>",
  },
  {
    question: "<p id='demo'>This is a demonstration.</p>",
    answers: [
      { text: "document.getElement('p').innerHTML = 'Hello World!';  " },
      { text: "document.getElementByName('p').innerHTML = 'Hello World!';" },
      { text: "document.getElementById('demo').innerHTML = 'Hello World!';" },
      { text: "#demo.innerHTML = 'Hello World!';" },
    ],
    answer: "document.getElementById('demo').innerHTML = 'Hello World!';",
  },
  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while (i <= 10; i++)" },
      { text: "while i = 1 to 10" },
      { text: "while (i <= 10)  " },
    ],
    answer: "while (i <= 10)  ",
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    answers: [{ text: "True" }, { text: "False" }],
    answer: "False",
  },
];

let interval = false;
function startClock() {
  timer.innerHTML = "time Remaining: " + timerValue;
  if (timerValue <= 0) {
    // gameOver();
    HighscorePrompt();
    clearInterval(interval);
  } else {
    timerValue -= 1;
  }
  if (!interval) {
    interval = setInterval(startClock, 1000);
  }
}
