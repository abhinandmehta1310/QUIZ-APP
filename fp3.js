const questions = [
    {
          question: " A member function can always access the data in __________ , (in C++). ",
          answers: [
            {text: "the class of which it is member", correct: true},
            {text:" the object of which it is a member", correct: false},
            {text:" the public part of its class", correct: false},
            {text:" the private part of its class", correct: false},
          ]
            },

            {
                question:"In C++, polymorphism requires:",
                answers: [
                    {text:" Inheritance only", correct: false},
                    {text:" Virtual functions only", correct: false},
                    {text:" References only", correct: false},
                    {text:" Inheritance, Virtual functions and references", correct: true},

                ]
            },

            {
                question:"Which of the following is not correct for virtual function in C++ ?",
                answers: [
                    {text:" Must be declared in public section of class.", correct: false},
                    {text:" Virtual function can be static.", correct: true},
                    {text:" Virtual function should be accessed using pointers.", correct: false},
                    {text:" Virtual function is defined in base class.", correct: false},

                ]
            },

            {
                question:"Which of the following is true?",
                answers: [
                    {text:" All objects of a class share all data members of class", correct: false},
                    {text:" Objects of a class do not share non-static members. Every object has its own copy.", correct: true},
                    {text:" Objects of a class do not share codes of non-static methods, they have their own copy", correct: false},
                    {text:" None of the above", correct: false},

                ]
            }
    
];

const questionElement = document.getElementById("ques");
const answerButtons = document.getElementById("ans-btns");
const nextButton = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
            }
        button.addEventListener("click", selectAnswer);
    });
}




function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    
}else{
    startQuiz();
}
});
startQuiz();