let operacaoAtiva = false;
let loopSensores = null;
let graficoFoguete = null;
let contadorTempo = 0;
let aguaSalvaAcumulada = 0;

const dadosIniciaisTalhoes = [
    { id: "TL-NORTE-01", cultura: "Algodão", vazao: "14.8 L/ha", sobreposicao: "0.2%", reducao: "91%", carbono: "-12.4 kg" },
    { id: "TL-SUL-09", cultura: "Milho", vazao: "16.1 L/ha", sobreposicao: "0.0%", reducao: "89%", carbono: "-10.8 kg" },
    { id: "TL-OESTE-04", cultura: "Soja", vazao: "13.5 L/ha", sobreposicao: "0.5%", reducao: "93%", carbono: "-14.1 kg" }
];

// Gerencia a troca de telas na interface de forma nativa e sem bugs
function trocarAba(event, nomeAba) {
    if (event) event.preventDefault();

    // Remove classe ativa de todos os botões da barra lateral
    const botoes = document.querySelectorAll('.nav-item');
    botoes.forEach(btn => btn.classList.remove('active'));

    // Adiciona classe ativa no botão clicado
    if (event) {
        event.currentTarget.classList.add('active');
    }

    // Oculta todas as telas do painel
    const telas = document.querySelectorAll('.aba-conteudo');
    telas.forEach(tela => tela.style.display = 'none');

    // Mostra a tela selecionada
    document.getElementById(`tela-${nomeAba}`).style.display = 'block';

    // Ajusta os títulos superiores de acordo com a área ativa
    const titulo = document.getElementById('main-title');
    const subtitulo = document.getElementById('main-subtitle');
    
    if(nomeAba === 'telemetria') {
        titulo.innerText = "Central de Pulverização Autônoma IA";
        subtitulo.innerText = "Mapeamento cirúrgico de defensivos agrícolas por altitude dinâmica";
    } else if(nomeAba === 'mapas') {
        titulo.innerText = "Geolocalização e Mapas de Calor";
        subtitulo.innerText = "Índice de vegetação NDVI integrado ao plano de voo";
    } else if(nomeAba === 'ecometricas') {
        titulo.innerText = "Painel ESG & Indicadores Ecológicos";
        subtitulo.innerText = "Métricas de preservação ambiental calculadas por hectare";
    } else if(nomeAba === 'historico') {
        titulo.innerText = "Banco de Dados de Auditoria";
        subtitulo.innerText = "Histórico persistente de missões concluídas com sucesso";
    }
}

function carregarGraficoEstrutural() {
    const ctx = document.getElementById('liveChart').getContext('2d');
    
    renderizarTabela();

    graficoFoguete = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0s'],
            datasets: [
                {
                    label: 'Altitude Atual (m)',
                    data: [0],
                    borderColor: '#00d2ff',
                    backgroundColor: 'rgba(0, 210, 255, 0.1)',
                    borderWidth: 2.5,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Limite Teto (3.5m)',
                    data: [3.5],
                    borderColor: '#ff453a',
                    borderDash: [5, 5],
                    borderWidth: 1.5,
                    fill: false
                },
                {
                    label: 'Limite Piso (1.5m)',
                    data: [1.5],
                    borderColor: '#ff453a',
                    borderDash: [5, 5],
                    borderWidth: 1.5,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#7e8da8' } } },
            scales: {
                x: { grid: { color: '#1e264a' }, ticks: { color: '#7e8da8' } },
                y: { min: 0, max: 6, grid: { color: '#1e264a' }, ticks: { color: '#7e8da8' } }
            }
        }
    });
}

function alternarSistemas() {
    const btn = document.getElementById('master-btn');
    const hw = document.getElementById('hw-status');
    operacaoAtiva = !operacaoAtiva;

    if (operacaoAtiva) {
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ABORTAR MISSÃO';
        btn.className = 'btn-cyber btn-deactivate';
        hw.innerText = "TRANSMITINDO DADOS 5G";
        imprimirTerminal("[CONEXÃO] Handshake com firmware Pixhawk estabelecido com sucesso.", "t-success");
        executarVarreduraSensores();
    } else {
        btn.innerHTML = '<i class="fa-solid fa-play"></i> INICIAR MISSÃO';
        btn.className = 'btn-cyber btn-activate';
        hw.innerText = "ONLINE (ESTÁVEL)";
        imprimirTerminal("[AVISO] Operação finalizada de forma segura pelo piloto remoto.", "t-sys");
        clearInterval(loopSensores);
        zerarDisplays();
    }
}

function executarVarreduraSensores() {
    loopSensores = setInterval(() => {
        contadorTempo += 1;
        
        const altitude = (Math.random() * (5.0 - 0.5) + 0.5).toFixed(2);
        const vento = (Math.random() * (22.0 - 5.0) + 5.0).toFixed(1);
        
        const latConst = (25.42 + Math.random() * 0.01).toFixed(4);
        const lonConst = (49.27 + Math.random() * 0.01).toFixed(4);
        document.getElementById('gps-coords').innerText = `PR - 25°${latConst}'S, 49°${lonConst}'W`;

        document.getElementById('val-altitude').innerHTML = `${altitude} <small>m</small>`;
        document.getElementById('val-vento').innerHTML = `${vento} <small>km/h</small>`;
        
        document.getElementById('bar-altitude').style.width = `${(altitude / 6) * 100}%`;
        document.getElementById('bar-vento').style.width = `${(vento / 25) * 100}%`;

        const elVazao = document.getElementById('val-vazao');
        const barVazao = document.getElementById('bar-vazao');
        const lblAlt = document.getElementById('lbl-altitude');
        const lblVaz = document.getElementById('lbl-vazao');

        if (altitude >= 1.50 && altitude <= 3.50) {
            elVazao.innerHTML = "12.4 <small>L/min</small>";
            barVazao.style.width = "75%";
            
            lblAlt.innerText = "ALTITUDE EXCELENTE";
            lblAlt.style.color = "#00f2fe";
            lblVaz.innerText = "Micro-aspersão sob Pressão Alvo";
            lblVaz.style.color = "#00f2fe";

            aguaSalvaAcumulada += 0.64;
            document.getElementById('val-economia').innerHTML = `${aguaSalvaAcumulada.toFixed(2)} <small>Litros</small>`;
            document.getElementById('bar-economia').style.width = `${Math.min(aguaSalvaAcumulada * 3, 100)}%`;

            imprimirTerminal(`[TELEMETRIA] Altitude: ${altitude}m | Vazão Nominal Constante. Zero deriva detectada.`, "t-success");
        } else {
            elVazao.innerHTML = "0.0 <small>L/min</small>";
            barVazao.style.width = "0%";
            lblVaz.innerText = "ELETROVÁLVULA BLOQUEADA (CORTE)";
            lblVaz.style.color = "#ff453a";

            if (altitude > 3.50) {
                lblAlt.innerText = "ALERTA: PERIGO DE DERIVA PELO VENTO";
                lblAlt.style.color = "#f59e0b";
                imprimirTerminal(`[SEGURANÇA] Válvula travada eletronicamente. Altitude elevada (${altitude}m) causaria desvio químico para rios/matas.`, "t-danger");
            } else {
                lblAlt.innerText = "ALERTA: RISCO DE SUCÇÃO DE FOLHAS";
                lblAlt.style.color = "#ff453a";
                imprimirTerminal(`[SEGURANÇA] Fluxo bloqueado. Drone muito próximo à copa da cultura (${altitude}m). Risco de colisão mecânica.`, "t-danger");
            }
        }

        atualizarGraficoTempoReal(contadorTempo, parseFloat(altitude));

    }, 1500);
}

function atualizarGraficoTempoReal(tempo, alt) {
    if (!graficoFoguete) return;

    if (graficoFoguete.data.labels.length > 10) {
        graficoFoguete.data