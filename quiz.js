"use strict";

class Question {
    static numberOfQuestions = 0;
    constructor(question, choices, correctChoice){
        this.question = question;
        this.choices = choices;
        this.correctChoice = correctChoice;
        ++Question.numberOfQuestions;
    }

    isCorrectChoice(selectedChoice){
        return this.correctChoice === selectedChoice;
    }
}

class Quiz {
    constructor(questions, totalQuestions){
        this.score = 0;
        this.index = 0;
        this.questions = questions;
        this.totalQuestions = totalQuestions;
    }

    getQuestionByIndex(){
        return this.questions[this.index];
    }

    checkCorrectChoice(selectedChoice){
        if(this.getQuestionByIndex().isCorrectChoice(selectedChoice)){
            this.score++;
        }
        this.index++;
    }

    isQuizEnded(){
        return this.index === this.totalQuestions;
    }
}

let questionsList = [
    new Question("Which of the following function of Array object joins all elements of an array into a string?", 
    ["concat()", "pop()",  "map()", "join()"], 4),
    new Question("Which of the following type of variable is visible everywhere in your JavaScript code?",
    ["global variable", "local variable","Both", "None"], 1),
    new Question("Which built-in method returns the length of the string?",
    ["length()","index()","size()","None of the above"],1),
    new Question("Which of the following function of String object returns the character at the specified index?",
    ["getAtIndex()","charAt()","getCharAt()","indexOf()"],2),
    new Question("Which of the following function of Array object adds and/or removes elements from an array?",
    ["remove()","unshift()","splice()","update()"],3)
]

let quiz;

function startQuiz(){
    let startBtnElmnt = document.getElementById("startBtn");
    startBtnElmnt.disabled = true;
    quiz = new Quiz(questionsList, Question.numberOfQuestions);
    toggleDisplay();
    displayQuestion();
}

function displayQuestion(){
    if(quiz.isQuizEnded()){
        displayScore();
    }else{
        showProgress();
        let currentQuestion = quiz.getQuestionByIndex();
        let question = document.getElementById("question");
        question.innerHTML = currentQuestion.question;
        for(var i=0;i<currentQuestion.choices.length;i++){
            let choiceElemnt = document.getElementById('choice'+i);
            choiceElemnt.innerHTML = currentQuestion.choices[i];
        }   
    } 
}

function checkAnswer(selectedChoice){
    quiz.checkCorrectChoice(selectedChoice);
    displayQuestion();
}

function showProgress(){
    let progressElemnt = document.getElementById('progress');
    progressElemnt.innerHTML = `Question ${quiz.index+1} of ${quiz.totalQuestions}`;
}

function displayScore(){
    toggleDisplay();
    const percentage = quiz.score * 100 / quiz.totalQuestions;
    let progressElemnt = document.getElementById('marks');
    progressElemnt.innerHTML = `Score: ${quiz.score} out of ${quiz.totalQuestions}! <br>Percentage: ${percentage}% `;
}

function toggleDisplay(){
    let quizElmnt = document.getElementById("quiz");
    let score = document.getElementById("score");
    if(quizElmnt.style.display === 'none'){
        quizElmnt.style.display = 'inline';
        score.style.display = 'none';
    }else if(quiz.isQuizEnded()){
        quizElmnt.style.display = 'none';
        score.style.display = 'inline';
    }
}