
// quiz questions and answers
const questions = [
    {
        question: "How to create a function in JavaScript?",
        answers: [
            { text: "make function[]", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "console.log()", correct: false },
            { text: ".pop()", correct: false },
        ]
    },
    {
        question: "what does the file have to end with to be a javascript file?",
        answers: [
            { text: ".js", correct: true },
            { text: ".javascript", correct: false },
            { text: ".json", correct: false },
            { text: ".jsx", correct: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            
            { text: "msg('Hello World')", correct: false },
            { text: "console.log('Hello World')", correct: false },
            { text: "popup('Hello World')", correct: false },
            { text: "alert('Hello World')", correct: true },
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false },
            { text: "var colors = ['red', 'green', 'blue']", correct: true },
            { text: "var colors = 'red', 'green', 'blue'", correct: false },
            { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false },
        ]
    }
];

// all necessary elements
const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// start quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// display the question and answers
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;

   
    answerButtons.innerHTML = "";

    // create a button for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// removes all previous answers
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// display next button if an answer is selected
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    
    // disable all buttons after an answer is selected
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// display the final score
function showScore() {
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}


// handle next button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
