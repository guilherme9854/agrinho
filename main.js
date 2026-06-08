// 1. Controle Absoluto do Modo Escuro / Claro (Sol / Lua Corrigido)
const themeToggleBtn = document.getElementById('theme-toggle');

if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = '🌙';
} else {
    themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '🌙';
    } else {
        themeToggleBtn.textContent = '☀️';
    }
});

// 2. Infográfico Interativo da Jornada
function switchStep(stepIndex) {
    const cards = document.querySelectorAll('.step-card');
    cards.forEach((card, index) => {
        if (index === (stepIndex - 1)) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// 3. Sistema Dinâmico de Accordions (Sanfona)
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const currentItem = button.parentElement;
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('active');
            }
        });
        currentItem.classList.toggle('active');
    });
});

// 4. Controle Corrigido do Menu Hambúrguer (Abertura e Retorno)
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

// 5. Sistema Interativo de Filtros (Seção Alternativas)
function filterAlternativas(category) {
    // Altera classe ativa dos botões
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filtra os cards estruturalmente
    const cards = document.querySelectorAll('.premium-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// 6. Logica Interativa do Mini Quiz Educacional
function checkQuiz(isCorrect, element) {
    const feedback = document.getElementById('quiz-feedback');
    const buttons = document.querySelectorAll('.option-btn');

    // Desativa todos os botões após a resposta
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        element.classList.add('correct');
        feedback.textContent = "Excelente! O Controle Biológico utiliza predadores naturais (como joaninhas para combater pulgões), eliminando pragas de maneira 100% ecológica e sem resíduos químicos.";
        feedback.className = "quiz-feedback success";
    } else {
        element.classList.add('wrong');
        feedback.textContent = "Resposta incorreta. A alternativa correta é a B (Controle Biológico), que se baseia nas relações ecológicas da própria natureza para regular a população de organismos nocivos.";
        feedback.className = "quiz-feedback error";
        
        // Destaca a alternativa certa para guiar o estudante
        buttons.forEach(btn => {
            if (btn.textContent.includes('Controle Biológico')) {
                btn.classList.add('correct');
            }
        });
    }
    feedback.classList.remove('hidden');
}

// 7. Mecanismo de Scroll Reveal (Surgimento suave ao rolar a tela)
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.9;
    
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal); // Executa no carregamento inicial