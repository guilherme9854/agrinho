// 1. Controle do Sistema de Modo Escuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.icon-sun');
const moonIcon = document.querySelector('.icon-moon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
}

themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.replace('light-mode', 'dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.replace('dark-mode', 'light-mode');
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    }
});

// 2. Sistema dos Botões Interativos (Abas / Accordions)
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

// 3. Sistema do Menu Hambúrguer (Abrir/Fechar Gaveta)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Previne travamento de cliques cruzados
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 4. Rolagem Suave e Fechamento Automático do Menu
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Fechar a gaveta se o usuário clicar em qualquer lugar fora dela
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});