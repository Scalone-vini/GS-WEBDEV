# AI.md — Registro de Uso de Inteligência Artificial

**Projeto:** AgroSat — Alertas Climáticos para o Campo  
**Disciplina:** Web Development — FIAP 2026  
**Equipe:** Vinicius Scalone (RM 573783) · Rafael de Souza (RM 568777)

---

## Interação 1

**O que foi solicitado para a IA:**  
Auxílio na estruturação da lógica do slideshow com suporte a swipe em dispositivos móveis. Pedimos que a IA explicasse como utilizar os eventos `touchstart` e `touchend` para detectar o gesto de deslize e navegar entre os slides.

**O que a IA retornou:**  
A IA explicou o funcionamento dos eventos de toque e forneceu um exemplo de código com cálculo da distância percorrida (`deltaX`) para acionar a troca de slide apenas quando o gesto ultrapassasse 50px, evitando trocas acidentais.

**O que foi alterado ou rejeitado e o motivo:**  
O código de exemplo foi adaptado para se integrar à função `irPara()` já existente no projeto, e o threshold foi mantido em 50px conforme sugerido. A estrutura geral foi aceita pois resolveu o problema de usabilidade mobile de forma elegante e sem dependências externas.

---

## Interação 2

**O que foi solicitado para a IA:**  
Ajuda para entender como aplicar a máscara de formatação de telefone em JavaScript puro, sem bibliotecas, formatando o campo conforme o usuário digita no padrão `(XX) XXXXX-XXXX`.

**O que a IA retornou:**  
A IA sugeriu o uso do evento `input` com `replace(/\D/g, '')` para remover caracteres não numéricos, seguido de condicionais com `replace` e expressões regulares para aplicar a formatação progressiva conforme o número de dígitos digitados.

**O que foi alterado ou rejeitado e o motivo:**  
A lógica foi incorporada diretamente ao projeto com pequenos ajustes na ordem das condicionais para garantir que o cursor não pulasse ao final do campo durante a digitação. A solução foi mantida pois evita dependências externas e é compatível com todos os navegadores modernos.

---

## Interação 3

**O que foi solicitado para a IA:**  
Consultamos a IA sobre a estrutura mais adequada para implementar a troca de tema (dark/light/campo) usando atributos `data-*` no elemento `<html>` em vez de trocar classes no `<body>`, e como persistir a escolha com `localStorage`.

**O que a IA retornou:**  
A IA explicou a vantagem de usar `data-tema` no `<html>` combinado com seletores CSS como `[data-tema="claro"]` para sobrescrever variáveis CSS de forma limpa e sem conflito. Também sugeriu o padrão de IIFE para restaurar o tema salvo ao carregar a página.

**O que foi alterado ou rejeitado e o motivo:**  
A abordagem foi adotada integralmente pois é mais semântica e escalável do que troca de classes. O código da IIFE de restauração foi levemente adaptado para rodar antes do primeiro render e evitar flash de tema incorreto (FOUT).

---

*Todas as demais funcionalidades do projeto — estrutura HTML, estilos CSS, lógica do quiz, validação do formulário, navegação e organização do código — foram desenvolvidas manualmente pela equipe sem auxílio de IA.*
