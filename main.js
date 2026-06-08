/* Ativa a rolagem suave ao clicar nos links do menu hambúrguer */
html {
    scroll-behavior: smooth;
}

/* ==========================================================================
   RODAPÉ DE COOKIES PREMIUM
   ========================================================================== */
.cookie-banner {
    position: fixed;
    bottom: -100px; /* Começa escondido para animar */
    left: 0;
    width: 100%;
    background-color: var(--card-bg);
    border-top: 2px solid var(--accent);
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
    z-index: 2000;
    transition: bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 16px 0;
}
.cookie-banner.show {
    bottom: 0;
}
.cookie-content {
    width: 90%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}
.cookie-content p {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.4;
}
.btn-cookie {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background var(--speed);
}
.btn-cookie:hover {
    background-color: var(--accent);
}

/* ==========================================================================
   REFERÊNCIAS MODERNIZADAS (GRID DE CARDS)
   ========================================================================== */
.references-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-top: 15px;
}
.ref-item {
    background: var(--card-bg);
    border: var(--border);
    border-radius: var(--radius);
    padding: 20px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: transform var(--speed), border-color var(--speed);
}
.ref-item:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
}
.ref-icon {
    font-size: 1.5rem;
    background: var(--bg-main);
    padding: 10px;
    border-radius: 8px;
    line-height: 1;
}
.ref-item h4 {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text-main);
}
.ref-item p {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.4;
}

/* Responsividade do Cookie */
@media(max-width: 600px) {
    .cookie-content {
        flex-direction: column;
        text-align: center;
    }
    .btn-cookie {
        width: 100%;
    }
}