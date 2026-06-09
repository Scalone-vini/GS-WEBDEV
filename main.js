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
}
