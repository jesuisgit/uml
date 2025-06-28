document.addEventListener("DOMContentLoaded", function () {
  const cidades = [
    "São Paulo", "Salvador", "São Francisco", "Santos", "Recife",
    "Fortaleza", "Florianópolis", "Foz do Iguaçu", "Rio de Janeiro", "Belo Horizonte"
  ];

  function autocomplete(inputId, sugestoesId) {
    const input = document.getElementById(inputId);
    const sugestoes = document.getElementById(sugestoesId);

    input.addEventListener("input", function () {
      const valor = input.value.toLowerCase();
      sugestoes.innerHTML = "";

      if (!valor) {
        sugestoes.style.display = "none";
        return;
      }

      const filtradas = cidades.filter(c => c.toLowerCase().startsWith(valor));

      if (filtradas.length > 0) {
        sugestoes.style.display = "block";
        filtradas.forEach(cidade => {
          const div = document.createElement("div");
          div.textContent = cidade;
          div.onclick = () => {
            input.value = cidade;
            sugestoes.style.display = "none";
          };
          sugestoes.appendChild(div);
        });
      } else {
        sugestoes.style.display = "none";
      }
    });

    // Fechar sugestões ao clicar fora
    document.addEventListener("click", (e) => {
      if (e.target !== input && !sugestoes.contains(e.target)) {
        sugestoes.style.display = "none";
      }
    });

    // Mostrar sugestões ao focar no campo
    input.addEventListener("focus", function () {
      if (input.value && sugestoes.children.length > 0) {
        sugestoes.style.display = "block";
      }
    });
  }

  autocomplete("origem", "sugestoes-origem");
  autocomplete("destino", "sugestoes-destino");

  // Ao enviar o formulário, redireciona
  document.querySelector(".busca-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const origem = document.getElementById("origem").value || "São Paulo (GNU)";
    const destino = document.getElementById("destino").value || "Salvador (SSA)";

    // Aqui você pode armazenar ou enviar os dados
    console.log("Origem:", origem);
    console.log("Destino:", destino);

    // Redireciona para os resultados
    window.location.href = "resultados.html";
  });

  // Código da página de pacotes (opcional)
  const botoesSeguinte = document.querySelectorAll(".btn-seguinte");
  botoesSeguinte.forEach(btn => {
    btn.addEventListener("click", function () {
      const opcao = this.closest(".opcao-viagem");
      localStorage.setItem("reservaConfirmada", opcao.outerHTML);
      window.location.href = "reservas.html";
    });
  });
});
