let currentQuestions = 0;
let correctAnswers = 0;

showQuentions();

//Events 

document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

//Functions

function showQuentions() {
    if(questions[currentQuestions]) {
        let q = questions[currentQuestions];

        let pctBar = Math.floor((currentQuestions / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pctBar}%`;

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml
        
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else {
        finishQuiz();
    }
};

function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestions].answer === clickOption) {
        correctAnswers++;
    }

    currentQuestions++;
    showQuentions();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);
    let scoreText1 = document.querySelector('.scoreText1');
    let scorePct = document.querySelector('.scorePct');

    if(points <= 3) {
        scoreText1.innerHTML = 'Ruim'
        scorePct.style.color = '#FF0000'
    }
    if(points >= 30 && points < 70) {
        scoreText1.innerHTML = 'Mais ou menos'
        scorePct.style.color = '#FFD300'
    }
    if(points >= 70) {
        scoreText1.innerHTML = 'Muito bem!!'
        scorePct.style.color = '#009929'
    } 

    document.querySelector('.scorePct').innerHTML = `Acertou: ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent() {
    currentQuestions = 0;
    correctAnswers = 0;
    showQuentions()
}