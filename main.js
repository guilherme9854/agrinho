// ==========================================================================
// CONFIGURAÇÕES GLOBAIS E ESTADO DA APLICAÇÃO
// ==========================================================================
let currentLang = 'pt';

// Banco de dados do Quiz Traduzido (Português, Inglês e Espanhol)
const quizData = [
    {
        question: {
            pt: "Qual é o principal objetivo do Controle Biológico na agricultura sustentável?",
            en: "What is the main objective of Biological Control in sustainable agriculture?",
            es: "¿Cuál es el objetivo principal del Control Biológico en la agricultura sostenible?"
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
                "Utilizar enemigos naturales (como insectos benéficos) para controlar plagas.",
                "Aumentar el uso de herbicidas sintéticos en el cultivo.",
                "Reemplazar el riego por productos químicos concentrados."
            ]
        },
        correct: 1
    },
    {
        question: {
            pt: "Qual dessas alternativas NÃO é considerada um impacto ambiental do uso excessivo de agrotóxicos?",
            en: "Which of these alternatives is NOT considered an environmental impact of excessive pesticide use?",
            es: "¿Cuál de estas alternativas NO se considera un impacto ambiental del uso excesivo de pesticidas?"
        },
        options: {
            pt: [
                "Poluição de lençóis freáticos e rios.",
                "Intoxicação de polinizadores essenciais como abelhas.",
                "Fortalecimento natural dos nutrientes originais do solo.",
                "Acúmulo de resíduos químicos na cadeia alimentar."
            ],
            en: [
                "Pollution of groundwater and rivers.",
                "Intoxication of essential pollinators like bees.",
                "Natural strengthening of original soil nutrients.",
                "Accumulation of chemical residues in the food chain."
            ],
            es: [
                "Contaminación de capas freáticas y ríos.",
                "Intoxicación de polinizadores esenciales como las abejas.",
                "Fortalecimiento natural de los nutrientes originales del suelo.",
                "Acumulación de residuos químicos en la cadena alimentaria."
            ]
        },
        correct: 2
    }
];

let currentQuestionIndex = 0;

// ==========================================================================
// INICIALIZAÇÃO DO SISTEMA
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMenuLateral();
    initLanguageDropdown();
    initInfografico();
    initScrollReveal();
    initQuiz();
    initFeedbackWidget();
    initCookies();
});

// ==========================================================================
// SISTEMA DE IDIOMAS (MENU HAMBÚRGUER / DROPDOWN DE IDIOMAS)
// ==========================================================================
function initLanguageDropdown() {
    const btn = document.getElementById('lang-dropdown-btn');
    const dropdown = document.querySelector('.lang-dropdown');
    const options = document.querySelectorAll('[data-lang-select]');

    // Abre e fecha o menu de idiomas ao clicar no botão global
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Fecha o menu se clicar em qualquer outro lugar da tela
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });

    // Captura a troca de idioma ao clicar em uma opção
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedLang = opt.getAttribute('data-lang-select');
            changeLanguage(selectedLang);
            
            // Atualiza o texto visual do botão do menu principal
            const flags = { pt: '🇧🇷 PT', en: '🇺🇸 EN', es: '🇪🇸 ES' };
            btn.textContent = `🌐 ${flags[selectedLang].split(' ')[1]}`;
            dropdown.classList.remove('active');
        });
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

    // Traduz todos os elementos estáticos que possuem os atributos customizados
    document.querySelectorAll(`[data-lang-${lang}]`).forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${lang}`);
    });

    // Recarrega a pergunta atual do quiz com o novo idioma aplicado
    renderQuizQuestion();
}

// ==========================================================================
// RENDERIZAÇÃO DO QUIZ (CORRIGIDO PARA SUPORTAR IDIOMAS DIRETAMENTE)
// ==========================================================================
function initQuiz() {
    const nextBtn = document.getElementById('btn-next-quiz');
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
        button.addEventListener('click', () => selectQuizOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectQuizOption(selectedIndex, clickedButton) {
    const currentQuiz = quizData[currentQuestionIndex];
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-quiz');

    // Desativa todos os botões para impedir múltiplos cliques
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.correct) {
        clickedButton.classList.add('correct');
        feedbackEl.className = "quiz-feedback success";
        
        const msgs = { pt: "Parabéns! Resposta correta. 🌿", en: "Congratulations! Correct answer. 🌿", es: "¡Felicitaciones! Respuesta correcta. 🌿" };
        feedbackEl.textContent = msgs[currentLang];
    } else {
        clickedButton.classList.add('wrong');
        buttons[currentQuiz.correct].classList.add('correct');
        feedbackEl.className = "quiz-feedback error";

        const msgs = { pt: "Resposta incorreta. Estude mais as alternativas biológicas!", en: "Incorrect answer. Learn more about biological alternatives!", es: "Respuesta incorrecta. ¡Estudie más as alternativas biológicas!" };
        feedbackEl.textContent = msgs[currentLang];
    }

    feedbackEl.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

function showQuizFinished() {
    const questionEl = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-quiz');

    optionsContainer.innerHTML = '';
    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden');

    const titles = { pt: "Desafio Concluído!", en: "Challenge Completed!", es: "¡Desafío Completado!" };
    const messages = { 
        pt: "Obrigado por participar do Quiz do Projeto Agrinho 2026. Você concluiu sua análise crítica com sucesso!", 
        en: "Thank you for participating in the Agrinho Project 2026 Quiz. You have successfully completed your critical analysis!", 
        es: "Gracias por participar en el Quiz del Proyecto Agrinho 2026. ¡Ha completado su análisis crítico con éxito!" 
    };

    questionEl.textContent = titles[currentLang];
    const p = document.createElement('p');
    p.style.marginTop = "10px";
    p.textContent = messages[currentLang];
    optionsContainer.appendChild(p);
}

// ==========================================================================
// CORREÇÃO DO WIDGET DE AVALIAÇÃO (E BOTÃO DE FECHAR "X")
// ==========================================================================
function initFeedbackWidget() {
    const triggerBtn = document.getElementById('feedback-trigger-btn');
    const card = document.getElementById('feedback-card');
    const closeBtn = document.getElementById('feedback-close-btn');
    const emojisContainer = document.getElementById('feedback-emojis');
    const thanksMsg = document.getElementById('feedback-thanks');

    // Abre e fecha o card de feedback ao clicar no botão flutuante
    triggerBtn.addEventListener('click', () => {
        card.classList.toggle('hidden');
    });

    // Fecha o card ao clicar no botão "X"
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.add('hidden');
    });

    // Gerencia o clique nos emojis para salvar e exibir o agradecimento da forma certa
    const emojiButtons = emojisContainer.querySelectorAll('.emoji-btn');
    emojiButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = btn.getAttribute('data-rating');
            localStorage.setItem('agro_feedback_rating', rating);

            // Esconde os emojis para dar lugar à mensagem de sucesso de forma limpa
            emojisContainer.classList.add('hidden');
            thanksMsg.classList.remove('hidden');

            // Fecha o card automaticamente após 2.5 segundos
            setTimeout(() => {
                card.classList.add('hidden');
                // Reseta o estado interno do card caso ele seja reaberto futuramente
                setTimeout(() => {
                    emojisContainer.classList.remove('hidden');
                    thanksMsg.classList.add('hidden');
                }, 400);
            }, 2500);
        });
    });
}

// ==========================================================================
// CONTROLE DO TEMA (LIGHT / DARK)
// ==========================================================================
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    toggle.textContent = savedTheme === 'light-mode' ? '🌙' : '☀️';

    toggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.className = 'dark-mode';
            toggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.className = 'light-mode';
            toggle.textContent = '🌙';
            localStorage.setItem('theme', 'light-mode');
        }
    });
}

// ==========================================================================
// MENU GAVETA LATERAL (RESPONSIVO)
// ==========================================================================
function initMenuLateral() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

// ==========================================================================
// FILTROS DAS ALTERNATIVAS SUSTENTÁVEIS
// ==========================================================================
function filterAlternativas(category) {
    const cards = document.querySelectorAll('.alternativas-container .card');
    const buttons = document.querySelectorAll('.filter-buttons .btn-filter');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ==========================================================================
// INFOGRÁFICO INTERATIVO (PASSOS)
// ==========================================================================
function switchStep(stepNumber) {
    const cards = document.querySelectorAll('.infographic-steps .step-card');
    cards.forEach((card, index) => {
        if (index + 1 === stepNumber) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// ==========================================================================
// COOKIES BANNER
// ==========================================================================
function initCookies() {
    const banner = document.getElementById('cookie-banner');
    const accept = document.getElementById('cookie-accept-btn');
    const decline = document.getElementById('cookie-decline-btn');
    const widget = document.getElementById('emoji-feedback-widget');

    if (!localStorage.getItem('agro_cookies_accepted')) {
        setTimeout(() => banner.classList.add('show'), 600);
    } else {
        widget.className = "feedback-widget cookie-hidden";
    }

    accept.addEventListener('click', () => {
        localStorage.setItem('agro_cookies_accepted', 'true');
        banner.classList.remove('show');
        widget.className = "feedback-widget cookie-hidden";
    });

    decline.addEventListener('click', () => {
        banner.classList.remove('show');
        widget.className = "feedback-widget cookie-hidden";
    });
}

// ==========================================================================
// ANIMACAO SCROLL REVEAL (OTIMIZADA COM INTERSECTION OBSERVER)
// ==========================================================================
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}