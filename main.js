// ==========================================================================
// 1. QUIZ GAMIFICADO E INTELIGENTE (COM SISTEMA DE PONTUAÇÃO)
// ==========================================================================
const quizData = [
    {
        question: "Qual método abaixo visa combater pragas agrícolas utilizando os próprios predadores naturais do ecossistema?",
        options: ["A) Herbicidas Seletivos", "B) Controle Biológico", "C) Lixiviação Química"],
        correct: 1,
        explanation: "Excelente! O Controle Biológico utiliza predadores naturais, eliminando pragas de maneira ecológica e sem resíduos químicos."
    },
    {
        question: "O acúmulo de substâncias químicas em tecidos vivos ao longo do tempo através da cadeia alimentar é chamado de:",
        options: ["A) Bioacumulação", "B) Fitossanidade", "C) Transgênese"],
        correct: 0,
        explanation: "Correto! A bioacumulação faz com que resíduos de defensivos fiquem retidos no organismo de forma progressiva."
    },
    {
        question: "Qual é o principal foco da técnica conhecida como MIP (Manejo Integrado de Pragas)?",
        options: ["A) Erradicar 100% dos insetos com químicos rápidos", "B) Associar métodos biológicos, culturais e químicos de forma equilibrada", "C) Substituir a irrigação por defensivos líquidos"],
        correct: 1,
        explanation: "Perfeito! O MIP integra ferramentas preventivas e biológicas para reduzir a dependência exclusiva de defensivos sintéticos."
    }
];

let currentQuestionIndex = 0;
let userScore = 0;

function loadQuizQuestion() {
    const progressEl = document.getElementById('quiz-progress');
    const questionEl = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-quiz');

    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden'); 
    optionsContainer.innerHTML = '';

    if (currentQuestionIndex < quizData.length) {
        progressEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
        const currentQuiz = quizData[currentQuestionIndex];
        questionEl.textContent = currentQuiz.question;

        currentQuiz.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => checkQuizAnswer(index, button);
            optionsContainer.appendChild(button);
        });
    } else {
        // Fim do Quiz - Tela de Resultado Final Dinâmica
        progressEl.textContent = "Desafio Concluído!";
        questionEl.textContent = `Você terminou o quiz! Pontuação final: ${userScore} de ${quizData.length} acertos.`;
        
        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn-submit';
        retryBtn.style.width = '100%';
        retryBtn.textContent = "Reiniciar Desafio";
        retryBtn.onclick = restartQuiz;
        optionsContainer.appendChild(retryBtn);
    }
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
        userScore++;
    } else {
        clickedButton.classList.add('wrong');
        buttons[currentQuiz.correct].classList.add('correct');
        feedbackEl.textContent = "Resposta incorreta. Estude as alternativas sustentáveis para gabaritar o teste!";
        feedbackEl.className = "quiz-feedback error";
    }
    
    feedbackEl.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    
    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = "Ver Resultado Final";
    } else {
        nextBtn.textContent = "Próxima Pergunta";
    }
}

document.getElementById('btn-next-quiz').addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuizQuestion();
});

function restartQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    document.getElementById('btn-next-quiz').textContent = "Próxima Pergunta";
    loadQuizQuestion();
}

document.addEventListener('DOMContentLoaded', loadQuizQuestion);


// ==========================================================================
// 2. INTERCEPTAÇÃO DO FORMULÁRIO DE SUGESTÕES (FEEDBACK VISUAL LIMPO)
// ==========================================================================
document.getElementById('form-sugestoes').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o reload da página
    
    const form = this;
    const successMsg = document.getElementById('form-success-msg');
    
    // Esconde o formulário devagar e mostra o alerta premium de sucesso
    form.style.display = 'none';
    successMsg.classList.remove('hidden');
    
    // Reseta o formulário após 4 segundos caso queira abrir de novo
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMsg.classList.add('hidden');
    }, 4500);
});


// ==========================================================================
// 3. COOKIES E AJUSTE DINÂMICO DE ALTURA DO WIDGET DE FEEDBACK
// ==========================================================================
window.addEventListener('load', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');
    const feedbackWidget = document.getElementById('emoji-feedback-widget');

    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 1200);

    function hideCookieBanner() {
        cookieBanner.classList.remove('show');
        feedbackWidget.classList.remove('cookie-above');
        feedbackWidget.classList.add('cookie-hidden');
    }

    acceptBtn.addEventListener('click', hideCookieBanner);
    declineBtn.addEventListener('click', hideCookieBanner);
});


// ==========================================================================
// 4. CONTROLE DE IDIOMA (PT / EN)
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
// 5. WIDGET DE FEEDBACK POR EMOJIS (INTERAÇÃO E AUTO-FECHAMENTO)
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
// 6. CONTROLE DE TEMA (SOL E LUA)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
});


// ==========================================================================
// 7. HAMBÚRGUER COM SUPORTE MOBILE COMPLETO
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
// 8. FILTROS E COMPONENTES AUXILIARES
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