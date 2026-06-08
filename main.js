// ==========================================================================
// 1. BANCO DE PERGUNTAS DO QUIZ (Muda rotativamente a cada erro)
// ==========================================================================
const quizData = [
    {
        question: "Qual método abaixo visa combater pragas agrícolas utilizando os próprios predadores naturais do ecossistema?",
        options: ["A) Herbicidas Seletivos", "B) Controle Biológico", "C) Lixiviação Química"],
        correct: 1,
        explanation: "Excelente! O Controle Biológico utiliza predadores naturais (como joaninhas para combater pulgões), eliminando pragas de maneira ecológica e sem resíduos químicos."
    },
    {
        question: "O acúmulo de substâncias químicas em tecidos vivos ao longo do tempo através da cadeia alimentar é chamado de:",
        options: ["A) Bioacumulação", "B) Fitossanidade", "C) Transgênese"],
        correct: 0,
        explanation: "Correto! A bioacumulação faz com que resíduos de defensivos fiquem retidos no organismo de animais e humanos de forma progressiva e cumulativa."
    },
    {
        question: "Qual é o principal foco da técnica conhecida como MIP (Manejo Integrado de Pragas)?",
        options: ["A) Erradicar 100% dos insetos com químicos rápidos", "B) Associar métodos biológicos, culturais e químicos de forma equilibrada", "C) Substituir a irrigação por defensivos líquidos"],
        correct: 1,
        explanation: "Perfeito! O MIP integra ferramentas preventivas, genéticas e biológicas para reduzir ao máximo a dependência exclusiva de defensivos sintéticos."
    }
];

let currentQuestionIndex = 0;

function loadQuizQuestion() {
    const questionEl = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-quiz');

    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuiz.question;

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkQuizAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

function checkQuizAnswer(selectedIndex, clickedButton) {
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-quiz');
    const buttons = document.querySelectorAll('.option-btn');

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.correct) {
        clickedButton.classList.add('correct');
        feedbackEl.textContent = currentQuiz.explanation;
        feedbackEl.className = "quiz-feedback success";
    } else {
        clickedButton.classList.add('wrong');
        feedbackEl.textContent = `Incorreto. A resposta certa era outra. Vamos tentar de novo com uma questão diferente?`;
        feedbackEl.className = "quiz-feedback error";
        
        buttons[currentQuiz.correct].classList.add('correct');
        nextBtn.classList.remove('hidden');
    }
    feedbackEl.classList.remove('hidden');
}

document.getElementById('btn-next-quiz').addEventListener('click', () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
    loadQuizQuestion();
});

document.addEventListener('DOMContentLoaded', loadQuizQuestion);


// ==========================================================================
// 2. SISTEMA INTERATIVO DE AVISO DE COOKIES
// ==========================================================================
window.addEventListener('load', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');

    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 1200);

    acceptBtn.addEventListener('click', () => {
        cookieBanner.classList.remove('show');
    });
});


// ==========================================================================
// 3. CONTROLE DE TEMA (SOL E LUA)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
});


// ==========================================================================
// 4. HAMBÚRGUER CORRIGIDO COM RETORNO
// ==========================================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); 
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});


// ==========================================================================
// 5. FILTROS E OUTROS RECURSOS
// ==========================================================================
function filterAlternativas(category) {
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('.premium-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function switchStep(stepIndex) {
    const cards = document.querySelectorAll('.step-card');
    cards.forEach((card, index) => {
        if (index === (stepIndex - 1)) card.classList.add('active');
        else card.classList.remove('active');
    });
}

document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const currentItem = button.parentElement;
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== currentItem) item.classList.remove('active');
        });
        currentItem.classList.toggle('active');
    });
});

const revealElements = document.querySelectorAll('.reveal');
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.9;
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < triggerBottom) el.classList.add('visible');
    });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);