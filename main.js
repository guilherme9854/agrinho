// 1. Controle Absoluto do Modo Escuro / Claro (Sol / Lua Corrigido)
const themeToggleBtn = document.getElementById('theme-toggle');

// Checa o tema salvo para iniciar com o emoji correto
if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = '🌙';
} else {
    themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    
    // CORREÇÃO: Altera o ícone cirurgicamente dependendo da classe atual
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '🌙';
    } else {
        themeToggleBtn.textContent = '☀️';
    }
});

// 2. Infográfico Interativo da Jornada (Troca de Passos)
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

// 4. Controle Corrigido do Menu Hambúrguer (Fechamento e Retorno Garantidos)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Clicar no botão abre ou fecha alternadamente e muda o visual para X
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); 
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// CORREÇÃO: Fechar o menu e voltar o hamburger ao estado normal quando clicar em abas internas
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// CORREÇÃO: Se clicar em qualquer outra parte vazia da tela, o menu fecha e o hamburger volta ao normal
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});