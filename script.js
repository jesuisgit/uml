document.addEventListener("DOMContentLoaded", function() {
  const cidades = [
    "São Paulo", "Salvador", "São Francisco", "Santos", "Recife",
    "Fortaleza", "Florianópolis", "Foz do Iguaçu", "Rio de Janeiro", "Belo Horizonte"
  ];

  function autocomplete(inputId, sugestoesId) {
    const input = document.getElementById(inputId);
    const sugestoes = document.getElementById(sugestoesId);

    input.addEventListener("input", function() {
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

    // Mostrar sugestões ao focar no campo (opcional)
    input.addEventListener("focus", function() {
      if (input.value && sugestoes.children.length > 0) {
        sugestoes.style.display = "block";
      }
    });
  }

  autocomplete("origem", "sugestoes-origem");
  autocomplete("destino", "sugestoes-destino");

  // Form submission handler
  document.querySelector(".busca-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Busca realizada com sucesso!");
    // Aqui você pode adicionar a lógica real de busca
  });
});


  // Captura os valores dos campos
  const origem = document.getElementById("origem").value || "São Paulo (GNU)";
  const destino = document.getElementById("destino").value || "Salvador (SSA)";
  
  // Redireciona para a página de resultados
  window.location.href = "resultados.html";
});

<script>
  document.querySelectorAll(".btn-seguinte").forEach(btn => {
    btn.addEventListener("click", function () {
      const opcao = this.closest(".opcao-viagem");
      localStorage.setItem("reservaConfirmada", opcao.outerHTML);
      window.location.href = "reservas.html";
    });
  });
</script>
