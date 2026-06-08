/* =====================================================
   AgroSat — main.js
   Web Development — FIAP 2026
   Vinicius Scalone (RM 573783) · Rafael de Souza (RM 568777)
   ===================================================== */

"use strict";

/* ─────────────────────────────────────────────────────
   1. SLIDESHOW — 3 imagens relacionadas ao tema
   ───────────────────────────────────────────────────── */

(function initSlideshow() {
  const slides = [
    {
      src: "images/slide1.jpg",
      alt: "Lavoura verde exuberante ao amanhecer monitorada por satélite",
      legenda: "🛰️ Satélites da NASA e INPE monitorando lavouras brasileiras 24h por dia",
    },
    {
      src: "images/slide2.jpg",
      alt: "Agricultor consultando alerta climático no smartphone no meio do campo",
      legenda: "📱 Alerta de geada recebido com 48 horas de antecedência — safra protegida",
    },
    {
      src: "images/slide3.jpg",
      alt: "Estação Arduino com sensores instalada em área rural sob céu estrelado",
      legenda: "🔌 Estação Arduino coletando dados de temperatura e umidade do solo em tempo real",
    },
  ];

  let indiceAtual = 0;
  let intervaloAuto;

  // Injeta o HTML do slideshow na seção de tecnologia
  const secaoTec = document.querySelector("#tecnologia .container");
  if (!secaoTec) return;

  const wrapper = document.createElement("div");
  wrapper.className = "slideshow-wrapper";
  wrapper.setAttribute("role", "region");
  wrapper.setAttribute("aria-label", "Galeria de imagens do AgroSat");
  wrapper.innerHTML = `
    <div class="slideshow" aria-live="polite">
      <div class="slideshow-trilha" id="slideshow-trilha"></div>
      <button class="slideshow-btn slideshow-btn-prev" aria-label="Imagem anterior" id="slide-prev">&#8592;</button>
      <button class="slideshow-btn slideshow-btn-next" aria-label="Próxima imagem" id="slide-next">&#8594;</button>
      <div class="slideshow-legenda" id="slideshow-legenda" aria-live="polite"></div>
    </div>
    <div class="slideshow-dots" id="slideshow-dots" role="tablist" aria-label="Navegação do slideshow"></div>
  `;

  // Insere antes do diagrama de tecnologia
  const diagrama = secaoTec.querySelector(".tec-diagrama");
  if (diagrama) {
    secaoTec.insertBefore(wrapper, diagrama);
  } else {
    secaoTec.appendChild(wrapper);
  }

  const trilha = document.getElementById("slideshow-trilha");
  const dotsContainer = document.getElementById("slideshow-dots");
  const legenda = document.getElementById("slideshow-legenda");

  // Cria os slides
  slides.forEach((slide, i) => {
    const div = document.createElement("div");
    div.className = "slideshow-slide" + (i === 0 ? " ativo" : "");
    div.setAttribute("role", "tabpanel");
    div.setAttribute("aria-label", `Slide ${i + 1} de ${slides.length}`);
    div.innerHTML = `
      <div class="slideshow-img-placeholder" aria-label="${slide.alt}">
        <span class="slide-emoji">${["🌾","📱","🔌"][i]}</span>
        <p>${slide.alt}</p>
      </div>`;
    trilha.appendChild(div);

    const dot = document.createElement("button");
    dot.className = "slideshow-dot" + (i === 0 ? " ativo" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Ir para slide ${i + 1}`);
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.addEventListener("click", () => irParaSlide(i));
    dotsContainer.appendChild(dot);
  });

  legenda.textContent = slides[0].legenda;

  function irParaSlide(novo) {
    const slidesEl = trilha.querySelectorAll(".slideshow-slide");
    const dots = dotsContainer.querySelectorAll(".slideshow-dot");

    slidesEl[indiceAtual].classList.remove("ativo");
    dots[indiceAtual].classList.remove("ativo");
    dots[indiceAtual].setAttribute("aria-selected", "false");

    indiceAtual = (novo + slides.length) % slides.length;

    slidesEl[indiceAtual].classList.add("ativo");
    dots[indiceAtual].classList.add("ativo");
    dots[indiceAtual].setAttribute("aria-selected", "true");
    legenda.textContent = slides[indiceAtual].legenda;
  }

  document.getElementById("slide-prev").addEventListener("click", () => {
    clearInterval(intervaloAuto);
    irParaSlide(indiceAtual - 1);
    reiniciarAuto();
  });

  document.getElementById("slide-next").addEventListener("click", () => {
    clearInterval(intervaloAuto);
    irParaSlide(indiceAtual + 1);
    reiniciarAuto();
  });

  function reiniciarAuto() {
    intervaloAuto = setInterval(() => irParaSlide(indiceAtual + 1), 4500);
  }

  reiniciarAuto();
})();

/* ─────────────────────────────────────────────────────
   2. FORMULÁRIO COM VALIDAÇÃO — impede campos vazios
   ───────────────────────────────────────────────────── */

(function initFormulario() {
  // Injeta seção de contato antes do footer
  const footer = document.querySelector("footer");
  if (!footer) return;

  const secao = document.createElement("section");
  secao.id = "contato";
  secao.className = "secao secao-alt";
  secao.setAttribute("aria-labelledby", "contato-titulo");
  secao.innerHTML = `
    <div class="container">
      <div class="secao-cabecalho">
        <div class="secao-num" aria-hidden="true">07</div>
        <div class="tag-destaque">Receba Alertas</div>
      </div>
      <h2 class="secao-titulo" id="contato-titulo">
        Cadastre-se e receba alertas climáticos da sua região
      </h2>
      <div class="secao-divider" aria-hidden="true"></div>

      <form class="form-contato" id="form-contato" novalidate aria-label="Formulário de cadastro AgroSat">
        <div class="form-linha">
          <div class="form-grupo">
            <label for="campo-nome">Nome completo <span aria-hidden="true">*</span></label>
            <input
              type="text"
              id="campo-nome"
              name="nome"
              placeholder="Ex: José Antônio da Silva"
              autocomplete="name"
              aria-required="true"
              aria-describedby="erro-nome"
            />
            <span class="form-erro" id="erro-nome" role="alert" aria-live="polite"></span>
          </div>
          <div class="form-grupo">
            <label for="campo-email">E-mail <span aria-hidden="true">*</span></label>
            <input
              type="email"
              id="campo-email"
              name="email"
              placeholder="seu@email.com"
              autocomplete="email"
              aria-required="true"
              aria-describedby="erro-email"
            />
            <span class="form-erro" id="erro-email" role="alert" aria-live="polite"></span>
          </div>
        </div>

        <div class="form-linha">
          <div class="form-grupo">
            <label for="campo-municipio">Município / UF <span aria-hidden="true">*</span></label>
            <input
              type="text"
              id="campo-municipio"
              name="municipio"
              placeholder="Ex: Uberaba, MG"
              aria-required="true"
              aria-describedby="erro-municipio"
            />
            <span class="form-erro" id="erro-municipio" role="alert" aria-live="polite"></span>
          </div>
          <div class="form-grupo">
            <label for="campo-cultura">Cultura principal <span aria-hidden="true">*</span></label>
            <select
              id="campo-cultura"
              name="cultura"
              aria-required="true"
              aria-describedby="erro-cultura"
            >
              <option value="">— Selecione —</option>
              <option value="cafe">Café</option>
              <option value="soja">Soja</option>
              <option value="milho">Milho</option>
              <option value="feijao">Feijão</option>
              <option value="hortalicas">Hortaliças</option>
              <option value="tomate">Tomate</option>
              <option value="cana">Cana-de-açúcar</option>
              <option value="outra">Outra</option>
            </select>
            <span class="form-erro" id="erro-cultura" role="alert" aria-live="polite"></span>
          </div>
        </div>

        <div class="form-grupo form-grupo-full">
          <label for="campo-mensagem">Como o clima afeta sua produção? (opcional)</label>
          <textarea
            id="campo-mensagem"
            name="mensagem"
            rows="3"
            placeholder="Conte sobre os maiores problemas climáticos na sua lavoura..."
            aria-describedby="contador-mensagem"
          ></textarea>
          <span class="form-contador" id="contador-mensagem" aria-live="polite">0 / 300 caracteres</span>
        </div>

        <div class="form-aceite">
          <input type="checkbox" id="aceite-lgpd" name="aceite" aria-required="true" aria-describedby="erro-aceite" />
          <label for="aceite-lgpd">
            Concordo em receber alertas climáticos e comunicações do AgroSat conforme a LGPD.
            <span aria-hidden="true"> *</span>
          </label>
        </div>
        <span class="form-erro" id="erro-aceite" role="alert" aria-live="polite"></span>

        <button type="submit" class="btn-primario form-submit" id="btn-submit">
          <span id="btn-submit-texto">🌿 Quero Receber Alertas</span>
          <span id="btn-submit-carregando" hidden aria-hidden="true">⏳ Enviando...</span>
        </button>

        <div class="form-sucesso" id="form-sucesso" hidden role="status" aria-live="polite">
          <div class="sucesso-icone">✅</div>
          <h3>Cadastro realizado com sucesso!</h3>
          <p>Você receberá alertas climáticos personalizados para <strong id="sucesso-municipio"></strong>. Fique de olho no e-mail!</p>
        </div>
      </form>
    </div>
  `;

  footer.parentNode.insertBefore(secao, footer);

  // Navegação: adiciona link Contato no menu
  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#contato">Contato</a>`;
    const ctaLi = navMenu.querySelector("li:last-child");
    navMenu.insertBefore(li, ctaLi);
  }

  // Validação
  const form = document.getElementById("form-contato");
  const campos = {
    nome: { el: document.getElementById("campo-nome"), erro: document.getElementById("erro-nome") },
    email: { el: document.getElementById("campo-email"), erro: document.getElementById("erro-email") },
    municipio: { el: document.getElementById("campo-municipio"), erro: document.getElementById("erro-municipio") },
    cultura: { el: document.getElementById("campo-cultura"), erro: document.getElementById("erro-cultura") },
  };
  const aceite = document.getElementById("aceite-lgpd");
  const erroAceite = document.getElementById("erro-aceite");
  const textarea = document.getElementById("campo-mensagem");
  const contador = document.getElementById("contador-mensagem");
  const btnTexto = document.getElementById("btn-submit-texto");
  const btnCarregando = document.getElementById("btn-submit-carregando");
  const formSucesso = document.getElementById("form-sucesso");
  const sucessoMunicipio = document.getElementById("sucesso-municipio");

  // Contador de textarea
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    if (len > 300) textarea.value = textarea.value.slice(0, 300);
    contador.textContent = `${Math.min(len, 300)} / 300 caracteres`;
  });

  function validarCampo(key) {
    const { el, erro } = campos[key];
    let msg = "";

    if (key === "email") {
      if (!el.value.trim()) {
        msg = "E-mail é obrigatório.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
        msg = "Informe um e-mail válido.";
      }
    } else if (key === "cultura") {
      if (!el.value) msg = "Selecione a cultura principal.";
    } else {
      if (!el.value.trim()) msg = "Este campo é obrigatório.";
      else if (el.value.trim().length < 3) msg = "Mínimo de 3 caracteres.";
    }

    erro.textContent = msg;
    el.classList.toggle("campo-invalido", !!msg);
    el.classList.toggle("campo-valido", !msg && el.value.trim() !== "");
    return !msg;
  }

  // Validação em tempo real ao sair do campo
  Object.keys(campos).forEach(key => {
    campos[key].el.addEventListener("blur", () => validarCampo(key));
    campos[key].el.addEventListener("input", () => {
      if (campos[key].el.classList.contains("campo-invalido")) validarCampo(key);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;
    Object.keys(campos).forEach(key => {
      if (!validarCampo(key)) valido = false;
    });

    if (!aceite.checked) {
      erroAceite.textContent = "Você precisa concordar para continuar.";
      valido = false;
    } else {
      erroAceite.textContent = "";
    }

    if (!valido) {
      // Foca no primeiro campo inválido
      const primeiro = form.querySelector(".campo-invalido");
      if (primeiro) primeiro.focus();
      return;
    }

    // Simula envio
    btnTexto.hidden = true;
    btnCarregando.hidden = false;
    document.getElementById("btn-submit").disabled = true;

    setTimeout(() => {
      form.style.display = "none";
      formSucesso.hidden = false;
      sucessoMunicipio.textContent = campos.municipio.el.value.trim();
      formSucesso.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1500);
  });
})();

/* ─────────────────────────────────────────────────────
   3. QUIZ DINÂMICO — 10 perguntas sobre o tema
   ───────────────────────────────────────────────────── */

(function initQuiz() {
  const perguntas = [
    {
      texto: "Qual fenômeno climático pode destruir uma plantação de café em poucas horas?",
      opcoes: ["Geada", "Vento moderado", "Nevoeiro", "Orvalho"],
      correta: 0,
      explicacao: "A geada provoca danos irreversíveis às células das plantas, destruindo a lavoura em poucas horas.",
    },
    {
      texto: "Qual API governamental gratuita fornece dados históricos de temperatura e precipitação?",
      opcoes: ["Google Maps API", "NASA POWER API", "OpenWeather Pro", "IBGE Clima"],
      correta: 1,
      explicacao: "A NASA POWER API disponibiliza gratuitamente 30 anos de dados climáticos globais via HTTP.",
    },
    {
      texto: "O que é um 'veranico' na agricultura?",
      opcoes: [
        "Vento forte no verão",
        "Período de seca dentro da estação chuvosa",
        "Tipo de praga das lavouras",
        "Chuva de granizo localizada",
      ],
      correta: 1,
      explicacao: "Veranico é uma pausa prolongada das chuvas durante a estação úmida, causando estresse hídrico grave.",
    },
    {
      texto: "Qual sensor Arduino é usado para medir temperatura e umidade do ar?",
      opcoes: ["HC-SR04", "DHT22", "PIR 501", "MQ-135"],
      correta: 1,
      explicacao: "O DHT22 é um sensor digital preciso que mede temperatura e umidade do ar, amplamente usado em estações meteorológicas.",
    },
    {
      texto: "Com quantas horas de antecedência o AgroSat pode emitir alertas de eventos críticos?",
      opcoes: ["6 horas", "12 horas", "48 horas", "7 dias"],
      correta: 2,
      explicacao: "O AgroSat combina dados do INPE com sensores locais para gerar alertas com até 48h de antecedência.",
    },
    {
      texto: "Qual tecnologia de comunicação permite ao Arduino enviar dados SEM cobertura de celular?",
      opcoes: ["Bluetooth", "Wi-Fi", "LoRaWAN", "4G LTE"],
      correta: 2,
      explicacao: "O LoRaWAN é uma tecnologia de longa distância e baixo consumo ideal para áreas rurais sem cobertura móvel.",
    },
    {
      texto: "Segundo a EMBRAPA, quanto o Brasil perde por ano em safras devido a eventos climáticos extremos?",
      opcoes: ["R$ 1 bilhão", "R$ 4 bilhões", "R$ 8 bilhões", "R$ 20 bilhões"],
      correta: 2,
      explicacao: "A EMBRAPA estima que o Brasil perde até R$ 8 bilhões anuais em safras por falta de alertas climáticos precisos.",
    },
    {
      texto: "O AgroSat foi projetado prioritariamente para qual público?",
      opcoes: [
        "Grandes fazendeiros do agronegócio",
        "Agricultores familiares com até 4 módulos fiscais",
        "Empresas de exportação de soja",
        "Pesquisadores universitários",
      ],
      correta: 1,
      explicacao: "O AgroSat foca nos +4,3 milhões de agricultores familiares brasileiros que carecem de tecnologia acessível.",
    },
    {
      texto: "Qual instituto brasileiro disponibiliza imagens GOES-16 e alertas de geada por município?",
      opcoes: ["EMBRAPA", "INPE", "IBAMA", "ANA"],
      correta: 1,
      explicacao: "O INPE (Instituto Nacional de Pesquisas Espaciais) opera satélites e disponibiliza dados meteorológicos nacionais.",
    },
    {
      texto: "Qual benefício do AgroSat facilita o acesso ao seguro agrícola (Pronaf / Garantia-Safra)?",
      opcoes: [
        "App offline",
        "Linguagem simples",
        "Relatórios automáticos de risco climático",
        "Integração com cooperativas",
      ],
      correta: 2,
      explicacao: "Relatórios automáticos de risco climático gerados pelo AgroSat facilitam a comprovação de perdas e contratação de seguros.",
    },
  ];

  // Encontra onde inserir — após seção de benefícios
  const secaoBen = document.querySelector("#beneficios");
  if (!secaoBen) return;

  const secaoQuiz = document.createElement("section");
  secaoQuiz.id = "quiz";
  secaoQuiz.className = "secao";
  secaoQuiz.setAttribute("aria-labelledby", "quiz-titulo");
  secaoQuiz.innerHTML = `
    <div class="container">
      <div class="secao-cabecalho">
        <div class="secao-num" aria-hidden="true">Q</div>
        <div class="tag-destaque">Quiz AgroSat</div>
      </div>
      <h2 class="secao-titulo" id="quiz-titulo">
        Teste seus conhecimentos sobre clima e agricultura
      </h2>
      <div class="secao-divider" aria-hidden="true"></div>
      <p class="secao-subtitulo">10 perguntas sobre o tema — descubra o quanto você sabe sobre tecnologia no campo!</p>

      <div class="quiz-container" id="quiz-container" aria-live="polite">
        <div class="quiz-progresso-bar" aria-label="Progresso do quiz">
          <div class="quiz-progresso-fill" id="quiz-prog-fill" style="width:0%"></div>
        </div>
        <div class="quiz-contador" id="quiz-contador" aria-live="polite">Pergunta 1 de 10</div>
        <div class="quiz-pergunta-box" id="quiz-pergunta-box">
          <p class="quiz-pergunta" id="quiz-pergunta"></p>
          <div class="quiz-opcoes" id="quiz-opcoes" role="radiogroup" aria-labelledby="quiz-pergunta"></div>
          <div class="quiz-feedback" id="quiz-feedback" hidden></div>
          <button class="btn-primario quiz-btn-prox" id="quiz-btn-prox" hidden>Próxima pergunta →</button>
        </div>
        <div class="quiz-resultado" id="quiz-resultado" hidden></div>
      </div>
    </div>
  `;

  secaoBen.insertAdjacentElement("afterend", secaoQuiz);

  // Adiciona link Quiz no menu
  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#quiz">Quiz</a>`;
    const contatoLi = Array.from(navMenu.querySelectorAll("li")).find(l => l.querySelector('a[href="#contato"]'));
    if (contatoLi) navMenu.insertBefore(li, contatoLi);
    else navMenu.appendChild(li);
  }

  let questaoAtual = 0;
  let pontuacao = 0;
  let respondida = false;

  const perguntaEl = document.getElementById("quiz-pergunta");
  const opcoesEl = document.getElementById("quiz-opcoes");
  const feedbackEl = document.getElementById("quiz-feedback");
  const btnProx = document.getElementById("quiz-btn-prox");
  const resultadoEl = document.getElementById("quiz-resultado");
  const contadorEl = document.getElementById("quiz-contador");
  const progFill = document.getElementById("quiz-prog-fill");

  function carregarPergunta() {
    respondida = false;
    const q = perguntas[questaoAtual];
    contadorEl.textContent = `Pergunta ${questaoAtual + 1} de ${perguntas.length}`;
    progFill.style.width = `${((questaoAtual) / perguntas.length) * 100}%`;
    perguntaEl.textContent = q.texto;
    feedbackEl.hidden = true;
    feedbackEl.textContent = "";
    btnProx.hidden = true;
    opcoesEl.innerHTML = "";

    q.opcoes.forEach((opcao, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-opcao";
      btn.textContent = opcao;
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", "false");
      btn.addEventListener("click", () => responder(i, btn));
      opcoesEl.appendChild(btn);
    });
  }

  function responder(indice, btnClicado) {
    if (respondida) return;
    respondida = true;

    const q = perguntas[questaoAtual];
    const botoes = opcoesEl.querySelectorAll(".quiz-opcao");

    botoes.forEach(b => { b.disabled = true; b.setAttribute("aria-checked", "false"); });

    if (indice === q.correta) {
      pontuacao++;
      btnClicado.classList.add("correta");
      feedbackEl.className = "quiz-feedback quiz-feedback-ok";
      feedbackEl.innerHTML = `✅ <strong>Correto!</strong> ${q.explicacao}`;
    } else {
      btnClicado.classList.add("errada");
      botoes[q.correta].classList.add("correta");
      feedbackEl.className = "quiz-feedback quiz-feedback-erro";
      feedbackEl.innerHTML = `❌ <strong>Incorreto.</strong> ${q.explicacao}`;
    }

    btnClicado.setAttribute("aria-checked", "true");
    feedbackEl.hidden = false;

    if (questaoAtual < perguntas.length - 1) {
      btnProx.hidden = false;
    } else {
      btnProx.textContent = "Ver resultado 🏆";
      btnProx.hidden = false;
    }
  }

  btnProx.addEventListener("click", () => {
    questaoAtual++;
    if (questaoAtual < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  });

  function mostrarResultado() {
    document.getElementById("quiz-pergunta-box").hidden = true;
    resultadoEl.hidden = false;
    progFill.style.width = "100%";

    const pct = Math.round((pontuacao / perguntas.length) * 100);
    let mensagem, nivel, emoji;

    if (pct === 100) { mensagem = "Perfeito! Você é um expert em AgroSat!"; nivel = "especialista"; emoji = "🏆"; }
    else if (pct >= 70) { mensagem = "Muito bem! Você entende bastante sobre tecnologia agrícola."; nivel = "avancado"; emoji = "🌟"; }
    else if (pct >= 50) { mensagem = "Bom esforço! Continue aprendendo sobre alertas climáticos."; nivel = "intermediario"; emoji = "🌱"; }
    else { mensagem = "Continue explorando o AgroSat para saber mais sobre o campo!"; nivel = "iniciante"; emoji = "📚"; }

    resultadoEl.innerHTML = `
      <div class="resultado-card nivel-${nivel}">
        <div class="resultado-emoji" aria-hidden="true">${emoji}</div>
        <h3 class="resultado-titulo">Você acertou ${pontuacao} de ${perguntas.length}</h3>
        <div class="resultado-pct" aria-label="${pct}% de aproveitamento">${pct}%</div>
        <p class="resultado-msg">${mensagem}</p>
        <button class="btn-primario resultado-btn-refazer" id="btn-refazer">🔄 Refazer Quiz</button>
      </div>
    `;

    document.getElementById("btn-refazer").addEventListener("click", () => {
      questaoAtual = 0;
      pontuacao = 0;
      resultadoEl.hidden = true;
      document.getElementById("quiz-pergunta-box").hidden = false;
      carregarPergunta();
    });
  }

  carregarPergunta();
})();

/* ─────────────────────────────────────────────────────
   4. TROCA DE COR DO TEMA — 3 opções de fundo
   ───────────────────────────────────────────────────── */

(function initTema() {
  const temas = [
    {
      id: "verde-escuro",
      label: "Verde Campo",
      emoji: "🌿",
      vars: {
        "--cor-fundo": "#0a1f0f",
        "--cor-fundo-claro": "#0f2d17",
        "--cor-primaria": "#1a6b3a",
        "--cor-acento": "#4caf6e",
        "--cor-ouro": "#c9a84c",
        "--cor-escuro": "#061209",
      },
    },
    {
      id: "azul-noite",
      label: "Céu Noturno",
      emoji: "🌙",
      vars: {
        "--cor-fundo": "#06111f",
        "--cor-fundo-claro": "#0b1e30",
        "--cor-primaria": "#1a4a7a",
        "--cor-acento": "#4c9faf",
        "--cor-ouro": "#c9a84c",
        "--cor-escuro": "#030a12",
      },
    },
    {
      id: "terra-quente",
      label: "Terra Quente",
      emoji: "🌅",
      vars: {
        "--cor-fundo": "#1a0f06",
        "--cor-fundo-claro": "#2d1a0a",
        "--cor-primaria": "#7a3a1a",
        "--cor-acento": "#d4804c",
        "--cor-ouro": "#e8c84c",
        "--cor-escuro": "#0f0805",
      },
    },
  ];

  const CHAVE_STORAGE = "agrosat-tema";

  // Cria o painel de temas fixo no canto
  const painel = document.createElement("div");
  painel.className = "tema-painel";
  painel.setAttribute("role", "region");
  painel.setAttribute("aria-label", "Seletor de tema de cores");
  painel.innerHTML = `
    <button class="tema-toggle" id="tema-toggle" aria-label="Abrir opções de tema" aria-expanded="false">🎨</button>
    <div class="tema-opcoes" id="tema-opcoes" hidden role="listbox" aria-label="Temas disponíveis">
      <p class="tema-titulo">Tema da Página</p>
      ${temas.map(t => `
        <button
          class="tema-opcao"
          data-tema="${t.id}"
          role="option"
          aria-label="Aplicar tema ${t.label}"
        >
          <span class="tema-cor-preview tema-preview-${t.id}"></span>
          <span>${t.emoji} ${t.label}</span>
        </button>
      `).join("")}
    </div>
  `;
  document.body.appendChild(painel);

  const toggle = document.getElementById("tema-toggle");
  const opcoes = document.getElementById("tema-opcoes");

  toggle.addEventListener("click", () => {
    const aberto = !opcoes.hidden;
    opcoes.hidden = aberto;
    toggle.setAttribute("aria-expanded", String(!aberto));
  });

  function aplicarTema(id) {
    const tema = temas.find(t => t.id === id);
    if (!tema) return;
    const root = document.documentElement;
    Object.entries(tema.vars).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });
    // Marca tema ativo
    document.querySelectorAll(".tema-opcao").forEach(btn => {
      btn.classList.toggle("ativo", btn.dataset.tema === id);
      btn.setAttribute("aria-selected", String(btn.dataset.tema === id));
    });
    localStorage.setItem(CHAVE_STORAGE, id);
  }

  document.querySelectorAll(".tema-opcao").forEach(btn => {
    btn.addEventListener("click", () => {
      aplicarTema(btn.dataset.tema);
      opcoes.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Fecha ao clicar fora
  document.addEventListener("click", e => {
    if (!painel.contains(e.target)) {
      opcoes.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Restaura tema salvo
  const temaSalvo = localStorage.getItem(CHAVE_STORAGE);
  if (temaSalvo) aplicarTema(temaSalvo);
  else aplicarTema("verde-escuro");
})();

/* ─────────────────────────────────────────────────────
   5. NAVEGAÇÃO MOBILE — menu hambúrguer
   ───────────────────────────────────────────────────── */

(function initNavMobile() {
  const navInner = document.querySelector(".nav-inner");
  const navMenu = document.querySelector(".nav-menu");
  if (!navInner || !navMenu) return;

  const btnHamburger = document.createElement("button");
  btnHamburger.className = "nav-hamburger";
  btnHamburger.setAttribute("aria-label", "Abrir menu de navegação");
  btnHamburger.setAttribute("aria-expanded", "false");
  btnHamburger.setAttribute("aria-controls", "nav-menu-mobile");
  btnHamburger.innerHTML = `<span></span><span></span><span></span>`;
  navInner.appendChild(btnHamburger);

  navMenu.id = "nav-menu-mobile";

  btnHamburger.addEventListener("click", () => {
    const aberto = navMenu.classList.toggle("aberto");
    btnHamburger.classList.toggle("ativo", aberto);
    btnHamburger.setAttribute("aria-expanded", String(aberto));
    btnHamburger.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu de navegação");
  });

  // Fecha ao clicar em link
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("aberto");
      btnHamburger.classList.remove("ativo");
      btnHamburger.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ─────────────────────────────────────────────────────
   6. NAV SCROLL — destaca link da seção visível
   ───────────────────────────────────────────────────── */

(function initNavScroll() {
  const secoes = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-menu a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.toggle(
            "nav-link-ativo",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-50% 0px -45% 0px" });

  secoes.forEach(s => observer.observe(s));
})();

/* ─────────────────────────────────────────────────────
   7. ANIMAÇÕES DE ENTRADA — Intersection Observer
   ───────────────────────────────────────────────────── */

(function initAnimacoes() {
  const alvosSel = [
    ".tec-card", ".ben-card", ".pub-card", ".obj-item",
    ".app-passo", ".tec-fluxo-passo", ".hero-stat",
    ".slideshow-wrapper", ".form-contato", ".quiz-container"
  ];

  const alvos = document.querySelectorAll(alvosSel.join(","));

  alvos.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity .5s ease ${(i % 4) * 0.1}s, transform .5s ease ${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  alvos.forEach(el => observer.observe(el));
})();
