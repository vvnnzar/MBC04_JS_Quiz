var quizHomepageElement = document.getElementById("homepage");
var startQuizButton = document.getElementById("start");
var quizContainerElement = document.getElementById("quiz-container");
var quizElement = document.getElementById("quiz");
var quizStatus = document.getElementById("quiz-status");
var correctMsg = document.getElementById("correct");
var incorrectMsg = document.getElementById("incorrect");
var timerContainer = document.getElementById("timer-container");
var timeCountdownElement = document.querySelector("#countdown");
var timerExpiryElement = document.getElementById("timer");
var statusElement = document.getElementById("status");
var resultsContainer = document.getElementById("results-container");
var resultsElement = document.querySelector("#results");
var saveButton = document.querySelector("#submit");
var retakeQuizButton = document.querySelector("#retake");
var scoreElement = document.getElementById("score");
var arrayItem = 0,
  question,
  availableOptions,
  choice,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAnswer = 0;

//Array to contain data required for questions, user selection options and correct answer

var questions = [
  //Array Format ["Question" [0], "optionA" [1], "optionB"[2], "optionC"[3], "optionD"[4], "correctAnswer"[5]],

  [
    "Inside which HTML element do we put the JavaScript?",
    "< javaScript >",
    "< js >",
    "< scripting >",
    "< script >",
    "D",
  ],

  [
    "Where is the correct place to insert a JavaScript?",
    "The < /head > section",
    "Both the < head > section and the < body > section are correct",
    "The < footer > section",
    "The < body > section",
    "B",
  ],

  [
    "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "< script name='xxx.js' >",
    "< script scr= 'xxx.js' >",
    "< script href='xxx.js' >",
    "None of the above",
    "B",
  ],

  [
    "How do you write 'Hello World' in an alert box?",
    "msgBox('Hello World');",
    "msg('Hello World'):",
    "alert('Hello World');",
    "alertBox('Hello World');",
    "C",
  ],

  [
    "How do you create a function in JavaScript?",
    "function myFunction()",
    "function = myFunction()",
    "function: myFunction()",
    "function_myFunction()",
    "A",
  ],

  [
    "Select the option that describes how to write an IF statement in JavaScript",
    "if i ==5 then",
    "if i = 5",
    "if i = 5 then",
    "if (i==5)",
    "D",
  ],

  [
    "How does a FOR loop start?",
    "for i = 1 to 5",
    "for (1 <= 5, i++)",
    "for (i=0, i<=5, i++)",
    "for (i=0,i<=5)",
    "C",
  ],

  [
    "How can you add a single line comment in a JavaScript?",
    "< !--This is a single line comment-- >",
    "* This is a single line comment*",
    "// This is a single line comment",
    "/* This is a single line comment */",
    "C",
  ],

  [
    "How do you declare a JavaScript variable?",
    "var carName",
    "variable carName",
    "v carName",
    "vble carName",
    "A",
  ],

  [
    "Which event occurs when the user clicks on an HTML element?",
    "onmouseover",
    "onmouseclick",
    "onclick",
    "onchange",
    "C",
  ],
];

//Initiate Quiz on click of 'Start Quiz'
startQuizButton.addEventListener("click", initiateQuiz);

function initiateQuiz() {
  quizHomepageElement.setAttribute("class", "hide");
  timerContainer.removeAttribute("class");
  quizContainerElement.removeAttribute("class");
  timer();
  renderQuestion();
  checkAnswer();
}

function timer() {
  var allocatedTime = 60;
  var timer = setInterval(function () {
    if (allocatedTime > 0) {
      timeCountdownElement.innerHTML = allocatedTime;
      allocatedTime--;
    } else {
      clearInterval(timer);
      timeCountdownElement.textContent = "Your time is up!";
      quizContainerElement.setAttribute("class", "hide");
      resultsContainer.removeAttribute("class");
      showResultPage();
    }
  }, 1000);
}

function renderQuestion() {
  correctMsg.innerHTML = "";
  incorrectMsg.innerHTML = "";

  question = questions[arrayItem][0];
  optionA = questions[arrayItem][1];
  optionB = questions[arrayItem][2];
  optionC = questions[arrayItem][3];
  optionD = questions[arrayItem][4];

  //Display Quiz
  quizElement.innerHTML = "<h3>" + question + "</h3>";
  quizElement.innerHTML +=
    "<input type='radio' name='availableOptions' value='A'> " +
    optionA +
    "<br>";
  quizElement.innerHTML +=
    "<input type='radio' name='availableOptions' value='B'> " +
    optionB +
    "<br>";
  quizElement.innerHTML +=
    "<input type='radio' name='availableOptions' value='C'> " +
    optionC +
    "<br>";
  quizElement.innerHTML +=
    "<input type='radio' name='availableOptions' value='D'> " +
    optionD +
    "<br><br>";
  quizElement.innerHTML +=
    "<button class='btn btn-primary btn-lg' onclick='checkAnswer()'>Submit Answer</button>";
}

//getElementsByName to list available options in an array. Determine user choice from availableOptions
function checkAnswer() {
  availableOptions = document.getElementsByName("availableOptions");
  for (var i = 0; i < availableOptions.length; i++) {
    if (availableOptions[i].checked) {
      choice = availableOptions[i].value;
    }
  }

  //Determine if user selection is correctAnswer as per questions array index [5]
  if (choice === questions[arrayItem][5]) {
    correctAnswer++;
    correctMsg.innerHTML = "Correct!";
  } else {
    incorrectMsg.innerHTML = "Wrong!";
    //incorrect timer penalty
  }

  setTimeout(function () {
    if (arrayItem === questions.length - 1) {
      // end quiz and show result page
      showResultPage();
      arrayItem = 0;
      correctAnswer = 0;
      return false;
    } else {
      arrayItem++;
      renderQuestion();
    }
  }, 800);
}

function showResultPage() {
  quizContainerElement.setAttribute("class", "hide");
  resultsContainer.removeAttribute("class");
  resultsElement.innerHTML = "Score:" + correctAnswer + "";
}

retakeQuizButton.addEventListener("click", retakeQuiz);

function retakeQuiz() {
  location.reload();
}

saveButton.addEventListener("click", function (e) {
  e.preventDefault();

  var userScore = {
    userIntials: initials.value.trim(),
    score: correctAnswer,
  };

  localStorage.setItem("userScore", JSON.stringify(userScore));
});
