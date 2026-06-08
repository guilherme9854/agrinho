// Controle do Tema Escuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.icon-sun');
const moonIcon = document.querySelector('.icon-moon');

// Verifica se o usuário já tinha uma preferência salva anteriormente
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
}

themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        // Mudar para o Modo Escuro
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
        localStorage.setItem('theme', 'dark');
    } else {
        // Mudar para o Modo Claro
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    }
});

// Rolagem Suave dos Links do Menu
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
