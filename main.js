let operacaoAtiva = false;
let loopSensores = null;
let graficoFoguete = null;
let contadorTempo = 0;
let aguaSalvaAcumulada = 0;

// Banco de Dados Local Fake (Simulando persistência de dados reais)
const dadosIniciaisTalhoes = [
    { id: "TL-NORTE-01", cultura: "Algodão", vazao: "14.8 L/ha", sobreposicao: "0.2%", reducao: "91%", carbono: "-12.4 kg" },
    { id: "TL-SUL-09", cultura: "Milho", vazao: "16.1 L/ha", sobreposicao: "0.0%", reducao: "89%", carbono: "-10.8 kg" },
    { id: "TL-OESTE-04", cultura: "Soja", vazao: "13.5 L/ha", sobreposicao: "0.5%", reducao: "93%", carbono: "-14.1 kg" }
];

// Inicialização do Gráfico Avançado com a Biblioteca Chart.js
function carregarGraficoEstrutural() {
    const ctx = document.getElementById('liveChart').getContext('2d');
    graficoFoguete = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Altitude Atual (m)',
                    data: [],
                    borderColor: '#00d2ff',
                    backgroundColor: 'rgba(0, 210, 255, 0.05)',
                    borderWidth: 2.5,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Limite Teto (Deriva)',
                    data: [],
                    borderColor: '#ff453a',
                    borderDash: [6, 6],
                    borderWidth: 1.5,
                    fill: false
                },
                {
                    label: 'Limite Piso (Colisão)',
                    data: [],
                    borderColor: '#ff453a',
                    borderDash: [6, 6],
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
    renderizarTabela();
}

// Inicia e Pausa a Operação Computacional do Drone
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

// Algoritmo Central de Sustentabilidade de Voo (Coração do Projeto para o Agrinho)
function executarVarreduraSensores() {
    loopSensores = setInterval(() => {
        contadorTempo += 1;
        
        // Simulação Estocástica de Altura e Vento em Condições Agrícolas Reais
        const altitude = (Math.random() * (5.0 - 0.5) + 0.5).toFixed(2);
        const vento = (Math.random() * (22.0 - 5.0) + 5.0).toFixed(1);
        
        // Geração Dinâmica de Coordenadas de GPS Fictícias (Região Agro do Paraná)
        const latConst = (25.42 + Math.random() * 0.01).toFixed(4);
        const lonConst = (49.27 + Math.random() * 0.01).toFixed(4);
        document.getElementById('gps-coords').innerText = `PR - 25°${latConst}'S, 49°${lonConst}'W`;

        // Manipulação Gráfica e Visual dos Elementos DOM
        document.getElementById('val-altitude').innerHTML = `${altitude} <small>m</small>`;
        document.getElementById('val-vento').innerHTML = `${vento} <small>km/h</small>`;
        
        // Atualiza Barras de Progresso Tecnológicas
        document.getElementById('bar-altitude').style.width = `${(altitude / 6) * 100}%`;
        document.getElementById('bar-vento').style.width = `${(vento / 25) * 100}%`;

        const elVazao = document.getElementById('val-vazao');
        const barVazao = document.getElementById('bar-vazao');
        const lblAlt = document.getElementById('lbl-altitude');
        const lblVaz = document.getElementById('lbl-vazao');

        // MÁXIMO EQUILÍBRIO AGRO-AMBIENTAL: LÓGICA DE PULVERIZAÇÃO ANTIDERIVA
        if (altitude >= 1.50 && altitude <= 3.50) {
            // Zona Verde Comercial Inteligente: Perfeita Aplicação Sem Desperdício
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
            // Zona Vermelha Crítica: Interrupção Eletrônica Instantânea para Prevenção de Crimes Ambientais
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

        // Alimentação de dados na API de Gráficos do Canvas
        atualizarGraficoTempoReal(contadorTempo, altitude);

    }, 1500);
}

function atualizarGraficoTempoReal(tempo, alt) {
    if (graficoFoguete.data.labels.length > 10) {
        graficoFoguete.data.labels.shift();
        graficoFoguete.data.datasets[0].data.shift();
        graficoFoguete.data.datasets[1].data.shift();
        graficoFoguete.data.datasets[2].data.shift();
    }
    graficoFoguete.data.labels.push(`${tempo}s`);
    graficoFoguete.data.datasets[0].data.push(alt);
    graficoFoguete.data.datasets[1].data.push(3.50); // Faixa Máxima Fixa
    graficoFoguete.data.datasets[2].data.push(1.50); // Faixa Mínima Fixa
    graficoFoguete.data.update();
}

function imprimirTerminal(mensagem, estilo) {
    const box = document.getElementById('terminal-output');
    const p = document.createElement('p');
    p.className = estilo;
    p.innerText = mensagem;
    box.appendChild(p);
    box.scrollTop = box.scrollHeight;
}

function limparTerminal() {
    document.getElementById('terminal-output').innerHTML = '<p class="t-sys">[SISTEMA] Logs limpos pelo usuário.</p>';
}

function renderizarTabela() {
    const tbody = document.getElementById('table-rows');
    tbody.innerHTML = dadosIniciaisTalhoes.map(dado => `
        <tr>
            <td style="font-family: 'JetBrains Mono', monospace;">${dado.id}</td>
            <td>${dado.cultura}</td>
            <td><strong>${dado.vazao}</strong></td>
            <td>${dado.sobreposicao}</td>
            <td class="text-green">${dado.reducao}</td>
            <td><span class="badge-row">${dado.carbono} CO2e</span></td>
        </tr>
    `).join('');
}

function zerarDisplays() {
    document.getElementById('val-altitude').innerHTML = `0.00 <small>m</small>`;
    document.getElementById('val-vazao').innerHTML = `0.0 <small>L/min</small>`;
    document.getElementById('bar-altitude').style.width = "0%";
    document.getElementById('bar-vazao').style.width = "0%";
    document.getElementById('lbl-altitude').innerText = "Voo em Standby";
    document.getElementById('lbl-vazao').innerText = "Válvula Fechada";
}

window.onload = carregarGraficoEstrutural;
