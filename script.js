// script.js

document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;
  const dataIda = document.getElementById("dataIda").value;
  const resultados = document.getElementById("resultados");

  resultados.innerHTML = "<p>Buscando passagens...</p>";

  // Simulando AJAX com setTimeout
  setTimeout(() => {
    // Simulando resposta
    const resposta = `
      <h4>Resultados para: ${origem} → ${destino} em ${new Date(dataIda).toLocaleDateString('pt-BR')}</h4>
      <ul>
        <li><strong>Companhia:</strong> ViajeAir | <strong>Horário:</strong> 08:00 | <strong>Preço:</strong> R$ 320</li>
        <li><strong>Companhia:</strong> BusExpress | <strong>Horário:</strong> 10:30 | <strong>Preço:</strong> R$ 150</li>
        <li><strong>Companhia:</strong> FastWings | <strong>Horário:</strong> 15:45 | <strong>Preço:</strong> R$ 400</li>
      </ul>
    `;

    resultados.innerHTML = resposta;
  }, 1000);
});
