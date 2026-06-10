// ==========================================================================
// CENTRAL DE TRADUÇÃO DO QUIZ
// ==========================================================================
let currentLang = 'pt';

const quizData = [
    {
        question: {
            pt: "Qual é o principal objetivo do Controle Biológico na agricultura sustentável?",
            en: "What is the main objective of Biological Control in sustainable agriculture?",
            es: "¿Cuál es el objetivo principal del Control Biológico na agricultura sostenible?",
            fr: "Quel est l'objectif principal du contrôle biologique?",
            de: "Was ist das Hauptziel der biologischen Schädlingsbekämpfung?",
            it: "Qual è l'obiettivo principale del controllo biologico?"
        },
        options: {
            pt: [
                "Eliminar toda a biodiversidade local para proteger as plantas.",
                "Utilizar inimigos naturais (como insetos benéficos) para controlar pragas.",
                "Aumentar o uso de herbicidas sintéticos na lavoura.",
                "Substituir a irrigação por produtos químicos concentrados."
            ],
            en: [
                "Eliminate all local biodiversity to protect plants.",
                "Use natural enemies (like beneficial insects) to control pests.",
                "Increase the use of synthetic herbicides in the crop.",
                "Replace irrigation with concentrated chemical products."
            ],
            es: [
                "Eliminar toda la biodiversidad local para proteger las plantas.",
                "Utilizar enemigos naturales para controlar plagas.",
                "Aumentar el uso de herbicidas sintéticos.",
                "Reemplazar el riego por productos químicos."
            ],
            fr: [
                "Éliminer toute la biodiversité locale.",
                "Utiliser des ennemis naturels pour lutter contre les bioagresseurs.",
                "Augmenter l'utilisation d'herbicides.",
                "Remplacer l'irrigation par des produits chimiques."
            ],
            de: [
                "Die gesamte lokale Artenvielfalt vernichten.",
                "Natürliche Feinde zur Schädlingsbekämpfung einsetzen.",
                "Den Einsatz synthetischer Herbizide erhöhen.",
                "Die Bewässerung durch Chemikalien ersetzen."
            ],
            it: [
                "Eliminare tutta la biodiversità locale.",
                "Utilizzare nemici naturali per controllare i parassiti.",
                "Aumentare l'uso di erbicidi sintetici.",
                "Sostituire l'irrigazione con prodotti chimici."
            ]
        },
        correct: 1
    }
];

let currentQuestionIndex = 0;

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMenuLateral();
    initLanguageSystem();
    initQuizSystem();
    initFeedbackWidget();
    initCookies();
    initScrollReveal();
});

// SISTEMA MULTI-IDIOMAS GLOBAL
function initLanguageSystem() {
    const btn = document.getElementById('lang-dropdown-btn');
    const dropdown = document.querySelector('.lang-dropdown');
    const options = document.querySelectorAll('[data-lang-select]');

    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => dropdown.classList.remove('active'));

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedLang = opt.getAttribute('data-lang-select');
            currentLang = selectedLang;
            
            const labelMap = { pt: 'PT', en: 'EN', es: 'ES', fr: 'FR', de: 'DE', it: 'IT' };
            btn.textContent = `🌐 ${labelMap[selectedLang]}`;
            
            document.querySelectorAll(`[data-lang-${selectedLang}]`).forEach(el => {
                el.textContent = el.getAttribute(`data-lang-${selectedLang}`);
            });

            renderQuizQuestion();
        });
    });
}

// SISTEMA DO QUIZ INTERATIVO
function initQuizSystem() {
    const nextBtn = document.getElementById('btn-next-quiz');
    if (!nextBtn) return;

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            renderQuizQuestion();
        } else {
            showQuizFinished();
        }
    });
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const questionEl = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-quiz');

    if (!questionEl || !optionsContainer) return;

    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    if (currentQuestionIndex >= quizData.length) {
        showQuizFinished();
        return;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuiz.question[currentLang];

    currentQuiz.options[currentLang].forEach((optionText, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = optionText;
        button.addEventListener('click', () => {
            const buttons = optionsContainer.querySelectorAll('.option-btn');
            buttons.forEach(b => b.disabled = true);

            if (index === currentQuiz.correct) {
                button.classList.add('correct');
                feedbackEl.className = "quiz-feedback success";
                const msg = { pt: "Correto! 🌿", en: "Correct! 🌿", es: "¡Correcto! 🌿", fr: "Correct! 🌿", de: "Richtig! 🌿", it: "Corretto! 🌿" };
                feedbackEl.textContent = msg[currentLang];
            } else {
                button.classList.add('wrong');
                buttons[currentQuiz.correct].classList.add('correct');
                feedbackEl.className = "quiz-feedback error";
                const msg = { pt: "Incorreto.", en: "Incorrect.", es: "Incorrecto.", fr: "Incorrect.", de: "Falsch.", it: "Incorretto." };
                feedbackEl.textContent = msg[currentLang];
            }
            feedbackEl.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        });
        optionsContainer.appendChild(button);
    });
}

function showQuizFinished() {
    const questionEl = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    if (!questionEl) return;
    const msgs = { pt: "Desafio Concluído!", en: "Challenge Completed!", es: "¡Desafío Completado!", fr: "Défi Terminé!", de: "Herausforderung Abgeschlossen!", it: "Sfida Completata!" };
    questionEl.textContent = msgs[currentLang];
    optionsContainer.innerHTML = '';
}

// CONTROLADOR DO WIDGET DE AVALIAÇÃO
function initFeedbackWidget() {
    const trigger = document.getElementById('feedback-trigger-btn');
    const card = document.getElementById('feedback-card');
    const closeButtons = document.querySelectorAll('.close-widget-action');
    const screenVoting = document.getElementById('feedback-screen-voting');
    const screenThanks = document.getElementById('feedback-screen-thanks');
    const emojis = document.querySelectorAll('.feedback-emojis .emoji-btn');

    if (!trigger || !card) return;

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('hidden');
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.add('hidden');
        });
    });

    emojis.forEach(emoji => {
        emoji.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.setItem('agro_voto', emoji.getAttribute('data-rating'));

            screenVoting.classList.add('hidden');
            screenThanks.classList.remove('hidden');

            setTimeout(() => {
                card.classList.add('hidden');
                setTimeout(() => {
                    screenVoting.classList.remove('hidden');
                    screenThanks.classList.add('hidden');
                }, 300);
            }, 2500);
        });
    });
}

// TEMA ESCURO/CLARO
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.className = 'dark-mode';
            toggle.textContent = '☀️';
        } else {
            document.body.className = 'light-mode';
            toggle.textContent = '🌙';
        }
    });
}

// MENU HAMBÚRGUER
function initMenuLateral() {
    const burger = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// FILTRAGEM DE CARDS
function filterAlternativas(category) {
    const cards = document.querySelectorAll('.alternativas-container .card');
    const buttons = document.querySelectorAll('.filter-buttons .btn-filter');
    
    buttons.forEach(b => b.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// PASSOS DO INFOGRÁFICO
function switchStep(step) {
    const cards = document.querySelectorAll('.infographic-steps .step-card');
    cards.forEach((c, idx) => {
        if (idx + 1 === step) c.classList.add('active');
        else c.classList.remove('active');
    });
}

// CONTROLADOR DE COOKIES
function initCookies() {
    const banner = document.getElementById('cookie-banner');
    const widget = document.getElementById('emoji-feedback-widget');
    if (!banner) return;

    if (!localStorage.getItem('cookies_ok')) {
        banner.classList.add('show');
    } else if (widget) {
        widget.className = "feedback-widget cookie-hidden";
    }

    document.getElementById('cookie-accept-btn').addEventListener('click', () => {
        localStorage.setItem('cookies_ok', true);
        banner.classList.remove('show');
        if (widget) widget.className = "feedback-widget cookie-hidden";
    });

    document.getElementById('cookie-decline-btn').addEventListener('click', () => {
        banner.classList.remove('show');
        if (widget) widget.className = "feedback-widget cookie-hidden";
    });
}

// ANIMAÇÃO DE SCROLL (REVEAL)
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.05 });
    els.forEach(el => obs.observe(el));
}