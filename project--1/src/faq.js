'use strict';

const questions = document.querySelectorAll('.question');
const answers = document.querySelectorAll('.answer');
const qButton = document.querySelectorAll('.q-button');
const wrapper = document.querySelectorAll('.wrapper');

const openAnswer = function(e){
    const clicked = e.target.closest('.question');

    if(!clicked) return;

    if(clicked.classList.contains('question-active')){
        clicked.classList.remove('question-active');
        document.querySelector(`.answer--${clicked.dataset.list}`).classList.remove('answer-active');
    }else{
        questions.forEach(q => q.classList.remove("question-active"));
        answers.forEach(a=>a.classList.remove('answer-active'));
        
        clicked.classList.add("question-active");
        document.querySelector(`.answer--${clicked.dataset.list}`).classList.add('answer-active');
    }
}
questions.forEach(q => q.addEventListener('click', openAnswer));

const handlingClicked = function(e){
    const checked= e.target.closest('.q-button');
    console.log(checked);
    if(!checked) return;

        qButton.forEach(b=> b.classList.remove("checked"));
        wrapper.forEach(w=>w.classList.remove('onshowing'));

        checked.classList.add('checked');
        document.querySelector(`.wrapper--${checked.dataset.box}`).classList.add("onshowing");
}

qButton.forEach(b=> b.addEventListener('click', handlingClicked));
