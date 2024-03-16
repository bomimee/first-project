'use strict';

const questionBoxes = document.querySelectorAll('.question-box');
const questions = document.querySelectorAll('.question');
const answers = document.querySelectorAll('.answer');

const openAnswer = function(e){
    const clicked = e.target.closest('.question');
    if(!clicked) return;

    if(clicked.classList.contains('question-active')){
        clicked.classList.remove('question-active');
        document.querySelector(`.answer--${clicked.dataset.list}`).classList.remove('answer-active');
    }else{
        questions.forEach(q => q.classList.remove(".question-active"));
        answers.forEach(a=>a.classList.remove('answer-active'));
        
        clicked.classList.add("question-active");
        document.querySelector(`.answer--${clicked.dataset.list}`).classList.add('answer-active');
    }
}
questions.forEach(q => q.addEventListener('click', openAnswer));

