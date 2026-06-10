// ==========================================================================
// 1. BANCO DE PERGUNTAS DO QUIZ (Com comportamento dinâmico e inteligente)
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
        nextBtn.classList.add('hidden'); 
    } else {
        clickedButton.classList.add('wrong');
        feedbackEl.textContent = `Incorreto. A resposta certa era outra. Vamos tentar novamente com uma questão diferente?`;
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
// 2. COOKIES E AJUSTE DINÂMICO DE ALTURA DO WIDGET DE FEEDBACK
// ==========================================================================
window.addEventListener('load', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');
    const feedbackWidget = document.getElementById('emoji-feedback-widget');

    // Mostra os cookies e mantém o feedback flutuando por cima dele
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 1200);

    // Esconde o banner e faz o widget de feedback descer para o canto inferor
    function hideCookieBanner() {
        cookieBanner.classList.remove('show');
        feedbackWidget.classList.remove('cookie-above');
        feedbackWidget.classList.add('cookie-hidden');
    }

    acceptBtn.addEventListener('click', hideCookieBanner);
    declineBtn.addEventListener('click', hideCookieBanner);
});


// ==========================================================================
// 3. CONTROLE DE IDIOMA (PT / EN)
// ==========================================================================
let currentLang = 'pt';
const langToggleBtn = document.getElementById('lang-toggle');

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    langToggleBtn.textContent = currentLang === 'pt' ? '🌐 PT' : '🌐 EN';
    
    document.querySelectorAll('[data-lang-pt]').forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${currentLang}`);
    });
});


// ==========================================================================
// 4. WIDGET DE FEEDBACK POR EMOJIS (INTERAÇÃO E AUTO-FECHAMENTO)
// ==========================================================================
const feedbackTrigger = document.getElementById('feedback-trigger-btn');
const feedbackCard = document.getElementById('feedback-card');
const feedbackClose = document.getElementById('feedback-close-btn');
const emojiButtons = document.querySelectorAll('.emoji-btn');
const feedbackThanks = document.getElementById('feedback-thanks');
const feedbackEmojisContainer = document.getElementById('feedback-emojis');

feedbackTrigger.addEventListener('click', () => {
    feedbackCard.classList.toggle('hidden');
});

feedbackClose.addEventListener('click', () => {
    feedbackCard.classList.add('hidden');
});

emojiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const rating = btn.getAttribute('data-rating');
        feedbackEmojisContainer.style.display = 'none';
        feedbackThanks.classList.remove('hidden');
        
        setTimeout(() => {
            feedbackCard.classList.add('hidden');
            setTimeout(() => {
                feedbackEmojisContainer.style.display = 'flex';
                feedbackThanks.classList.add('hidden');
            }, 400);
        }, 2000);
    });
});


// ==========================================================================
// 5. CONTROLE DE TEMA (SOL E LUA)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
});


// ==========================================================================
// 6. HAMBÚRGUER COM SUPORTE MOBILE COMPLETO
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
// 7. FILTROS E COMPONENTES AUXILIARES
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