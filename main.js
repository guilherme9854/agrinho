// 1. Controle Inteligente do Modo Escuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    
    // Altera o emoji dinamicamente para combinar com o modo ativo
    if(document.body.classList.contains('dark-mode')) {
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
        
        // Opcional: Fecha outros accordions abertos ao clicar em um novo
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('active');
            }
        });

        currentItem.classList.toggle('active');
    });
});

// 4. Controle de Abertura/Fechamento do Menu Hambúrguer Lateral
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita conflitos de clique com o documento
    navMenu.classList.toggle('active');
});

// Fecha a gaveta lateral automaticamente ao clicar em um link interno
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Fecha a gaveta se o usuário clicar fora do menu lateral
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});