"use strict";

(function initSlideshow() {
  const secao = document.querySelector("#tecnologia .container");
  if (!secao) return;

  const slides = [
    { emoji: "🌾", texto: "Satélites monitorando lavouras 24h por dia" },
    { emoji: "📱", texto: "Alerta de geada recebido com 48h de antecedência" },
    { emoji: "🔌", texto: "Arduino coletando temperatura e umidade do solo" },
  ];

  let atual = 0;
  const wrapper = document.createElement("div");
  wrapper.className = "slideshow-wrapper";
  wrapper.innerHTML = `
    <div class="slideshow">
      <div id="slide-conteudo"></div>
      <div id="slide-legenda"></div>
      <button id="slide-prev">← Anterior</button>
      <button id="slide-next">Próximo →</button>
    </div>
  `;

  const diagrama = secao.querySelector(".tec-diagrama");
  diagrama ? secao.insertBefore(wrapper, diagrama) : secao.appendChild(wrapper);

  const conteudo = document.getElementById("slide-conteudo");
  const legenda  = document.getElementById("slide-legenda");

  function mostrarSlide() {
    conteudo.textContent = slides[atual].emoji;
    legenda.textContent  = slides[atual].texto;
  }
  document.getElementById("slide-prev").addEventListener("click", function () {
    atual = (atual - 1 + slides.length) % slides.length;
    mostrarSlide();
  });

  document.getElementById("slide-next").addEventListener("click", function () {
    atual = (atual + 1) % slides.length;
    mostrarSlide();
  });

  setInterval(function () {
    atual = (atual + 1) % slides.length;
    mostrarSlide();
  }, 4000);

  mostrarSlide();
})();

(function initFormulario() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const secao = document.createElement("section");
  secao.id = "contato";
  secao.className = "secao secao-alt";
  secao.innerHTML = `
    <div class="container">
      <h2>Cadastre-se e receba alertas climáticos</h2>
      <form id="form-contato" novalidate>
        <div class="form-grupo">
          <label for="campo-nome">Nome completo *</label>
          <input type="text" id="campo-nome" placeholder="Ex: José Silva" />
          <span class="form-erro" id="erro-nome"></span>
        </div>
        <div class="form-grupo">
          <label for="campo-email">E-mail *</label>
          <input type="email" id="campo-email" placeholder="seu@email.com" />
          <span class="form-erro" id="erro-email"></span>
        </div>

        <div class="form-grupo">
          <label for="campo-municipio">Município / UF *</label>
          <input type="text" id="campo-municipio" placeholder="Ex: Uberaba, MG" />
          <span class="form-erro" id="erro-municipio"></span>
        </div>
        <div class="form-grupo">
          <label for="campo-cultura">Cultura principal *</label>
          <select id="campo-cultura">
            <option value="">— Selecione —</option>
            <option value="cafe">Café</option>
            <option value="soja">Soja</option>
            <option value="milho">Milho</option>
            <option value="feijao">Feijão</option>
            <option value="outra">Outra</option>
          </select>
          <span class="form-erro" id="erro-cultura"></span>
        </div>
        <div class="form-grupo">
          <input type="checkbox" id="aceite-lgpd" />
          <label for="aceite-lgpd">Concordo em receber alertas conforme a LGPD *</label>
          <span class="form-erro" id="erro-aceite"></span>
        </div>
        <button type="submit">🌿 Quero Receber Alertas</button>
      </form>
      <div id="form-sucesso" style="display:none">
        <p>✅ Cadastro realizado! Alertas para <strong id="sucesso-municipio"></strong>.</p>
      </div>
    </div>
  `;

  footer.parentNode.insertBefore(secao, footer);
  const form = document.getElementById("form-contato");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome      = document.getElementById("campo-nome");
    const email     = document.getElementById("campo-email");
    const municipio = document.getElementById("campo-municipio");
    const cultura   = document.getElementById("campo-cultura");
    const aceite    = document.getElementById("aceite-lgpd");

    let valido = true;

    ["nome","email","municipio","cultura","aceite"].forEach(function (id) {
      document.getElementById("erro-" + id).textContent = "";
    });

    if (nome.value.trim().length < 3) {
      document.getElementById("erro-nome").textContent = "Nome obrigatório (mínimo 3 letras).";
      valido = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      document.getElementById("erro-email").textContent = "E-mail inválido.";
      valido = false;
    }
    if (municipio.value.trim().length < 3) {
      document.getElementById("erro-municipio").textContent = "Município obrigatório.";
      valido = false;
    }
    if (!cultura.value) {
      document.getElementById("erro-cultura").textContent = "Selecione uma cultura.";
      valido = false;
    }
    if (!aceite.checked) {
      document.getElementById("erro-aceite").textContent = "Você precisa concordar para continuar.";
      valido = false;
    }

    if (!valido) return;

    form.style.display = "none";
    document.getElementById("sucesso-municipio").textContent = municipio.value.trim();
    document.getElementById("form-sucesso").style.display = "block";
  });
})();
(function initQuiz() {
  const secaoBen = document.querySelector("#beneficios");
  if (!secaoBen) return;

  const perguntas = [
    {
      texto: "Qual fenômeno climático pode destruir uma plantação de café em poucas horas?",
      opcoes: ["Geada", "Vento moderado", "Nevoeiro", "Orvalho"],
      correta: 0,
      explicacao: "A geada destrói as células das plantas em poucas horas.",
    },
    {
      texto: "Qual API gratuita fornece dados históricos de temperatura e precipitação?",
      opcoes: ["Google Maps API", "NASA POWER API", "OpenWeather Pro", "IBGE Clima"],
      correta: 1,
      explicacao: "A NASA POWER API disponibiliza 30 anos de dados climáticos gratuitamente.",
    },
    {
      texto: "O que é um 'veranico' na agricultura?",
      opcoes: ["Vento forte no verão", "Seca dentro da estação chuvosa", "Tipo de praga", "Chuva de granizo"],
      correta: 1,
      explicacao: "Veranico é uma pausa prolongada das chuvas durante a estação úmida.",
    },
    {
      texto: "Qual sensor Arduino mede temperatura e umidade do ar?",
      opcoes: ["HC-SR04", "DHT22", "PIR 501", "MQ-135"],
      correta: 1,
      explicacao: "O DHT22 é amplamente usado em estações meteorológicas.",
    },
    {
      texto: "Com quantas horas de antecedência o AgroSat emite alertas críticos?",
      opcoes: ["6 horas", "12 horas", "48 horas", "7 dias"],
      correta: 2,
      explicacao: "O AgroSat gera alertas com até 48h de antecedência.",
    },
    {
      texto: "Qual tecnologia permite ao Arduino enviar dados SEM cobertura de celular?",
      opcoes: ["Bluetooth", "Wi-Fi", "LoRaWAN", "4G LTE"],
      correta: 2,
      explicacao: "LoRaWAN funciona em áreas rurais sem cobertura móvel.",
    },
    {
      texto: "Quanto o Brasil perde por ano em safras por eventos climáticos extremos?",
      opcoes: ["R$ 1 bi", "R$ 4 bi", "R$ 8 bi", "R$ 20 bi"],
      correta: 2,
      explicacao: "A EMBRAPA estima perdas de até R$ 8 bilhões anuais.",
    },
    {
      texto: "O AgroSat foi criado prioritariamente para qual público?",
      opcoes: ["Grandes fazendeiros", "Agricultores familiares", "Exportadores de soja", "Pesquisadores"],
      correta: 1,
      explicacao: "Foco nos +4,3 milhões de agricultores familiares brasileiros.",
    },
    {
      texto: "Qual instituto disponibiliza imagens GOES-16 e alertas de geada por município?",
      opcoes: ["EMBRAPA", "INPE", "IBAMA", "ANA"],
      correta: 1,
      explicacao: "O INPE opera satélites e disponibiliza dados meteorológicos nacionais.",
    },
    {
      texto: "Qual benefício do AgroSat facilita o acesso ao seguro agrícola?",
      opcoes: ["App offline", "Linguagem simples", "Relatórios de risco climático", "Integração com cooperativas"],
      correta: 2,
      explicacao: "Relatórios automáticos facilitam a comprovação de perdas.",
    },
  ];
  const secaoQuiz = document.createElement("section");
  secaoQuiz.id = "quiz";
  secaoQuiz.className = "secao";
  secaoQuiz.innerHTML = `
    <div class="container">
      <h2>Quiz — Teste seus conhecimentos</h2>
      <div id="quiz-container">
        <p id="quiz-contador"></p>
        <p id="quiz-pergunta"></p>
        <div id="quiz-opcoes"></div>
        <p id="quiz-feedback" style="display:none"></p>
        <button id="quiz-btn-prox" style="display:none">Próxima →</button>
        <div id="quiz-resultado" style="display:none"></div>
      </div>
    </div>
  `;

  secaoBen.insertAdjacentElement("afterend", secaoQuiz);

  let questaoAtual = 0;
  let pontuacao    = 0;
  let respondida   = false;

  const perguntaEl  = document.getElementById("quiz-pergunta");
  const opcoesEl    = document.getElementById("quiz-opcoes");
  const feedbackEl  = document.getElementById("quiz-feedback");
  const btnProx     = document.getElementById("quiz-btn-prox");
  const resultadoEl = document.getElementById("quiz-resultado");
  const contadorEl  = document.getElementById("quiz-contador");
  function carregarPergunta() {
    respondida = false;
    feedbackEl.style.display = "none";
    btnProx.style.display    = "none";
    opcoesEl.innerHTML       = "";

    const q = perguntas[questaoAtual];
    contadorEl.textContent = "Pergunta " + (questaoAtual + 1) + " de " + perguntas.length;
    perguntaEl.textContent = q.texto;

    q.opcoes.forEach(function (opcao, i) {
      const btn = document.createElement("button");
      btn.className   = "quiz-opcao";
      btn.textContent = opcao;
      btn.addEventListener("click", function () { responder(i, btn); });
      opcoesEl.appendChild(btn);
    });
  }

  function responder(indice, btnClicado) {
    if (respondida) return;
    respondida = true;

    const q = perguntas[questaoAtual];
    opcoesEl.querySelectorAll(".quiz-opcao").forEach(function (b) { b.disabled = true; });

    if (indice === q.correta) {
      pontuacao++;
      btnClicado.style.background = "green";
      feedbackEl.textContent = "✅ Correto! " + q.explicacao;
    } else {
      btnClicado.style.background = "red";
      opcoesEl.querySelectorAll(".quiz-opcao")[q.correta].style.background = "green";
        feedbackEl.textContent = "❌ Incorreto. " + q.explicacao;
    }
    feedbackEl.style.display = "block";
    btnProx.textContent   = questaoAtual < perguntas.length - 1 ? "Próxima →" : "Ver resultado 🏆";
    btnProx.style.display = "inline-block";
  }
})();