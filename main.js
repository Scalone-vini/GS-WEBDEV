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