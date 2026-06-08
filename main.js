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