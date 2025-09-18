// Seleciona elementos
const formSimulador = document.getElementById("form-simulador");
const resultadoEl = document.getElementById("resultado");
const mensalidadeEl = document.getElementById("mensalidade");
const totalEl = document.getElementById("total");

// Função para calcular o crédito
function calcularCredito(valor, juros, prazo) {
  const taxaMensal = juros / 12 / 100;
  const mensalidade = valor * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazo)));
  const total = mensalidade * prazo;
  return { mensalidade, total };
}

// Evento do formulário
formSimulador.addEventListener("submit", (e) => {
  e.preventDefault();

  const valor = parseFloat(document.getElementById("valor").value);
  const juros = parseFloat(document.getElementById("juros").value);
  const prazo = parseInt(document.getElementById("prazo").value);

  if (isNaN(valor) || isNaN(juros) || isNaN(prazo)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const resultado = calcularCredito(valor, juros, prazo);

  // Exibe os resultados
  mensalidadeEl.textContent = `Prestação Mensal: MZN ${resultado.mensalidade.toFixed(2)}`;
  totalEl.textContent = `Total a Pagar: MZN ${resultado.total.toFixed(2)}`;

  // Adiciona a classe para mostrar o resultado
  resultadoEl.classList.add("show");
});


document.addEventListener("DOMContentLoaded", () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.2}s`;
      });
    });


    document.getElementById("form-simulador").addEventListener("submit", function(e) {
    e.preventDefault();

    const valor = parseFloat(document.getElementById("valor").value);
    const juros = parseFloat(document.getElementById("juros").value) / 100 / 12; // juros mensais
    const prazo = parseInt(document.getElementById("prazo").value);

    if (isNaN(valor) || isNaN(juros) || isNaN(prazo) || prazo <= 0) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Fórmula da prestação fixa (Price)
    const mensalidade = (valor * juros) / (1 - Math.pow(1 + juros, -prazo));
    const total = mensalidade * prazo;

    // Mostrar resultados formatados
    document.getElementById("mensalidade").textContent = 
      `Mensalidade: ${mensalidade.toFixed(2)} MZN`;
    document.getElementById("total").textContent = 
      `Total a pagar: ${total.toFixed(2)} MZN`;

    // Animação de exibição
    const resultado = document.getElementById("resultado");
    resultado.classList.add("show");
  });