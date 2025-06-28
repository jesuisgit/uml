<script>
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

      document.addEventListener("click", (e) => {
        if (e.target !== input && !sugestoes.contains(e.target)) {
          sugestoes.style.display = "none";
        }
      });

      input.addEventListener("focus", function () {
        if (input.value && sugestoes.children.length > 0) {
          sugestoes.style.display = "block";
        }
      });
    }

    autocomplete("origem", "sugestoes-origem");
    autocomplete("destino", "sugestoes-destino");

    const buscaForm = document.querySelector(".busca-form");
    if (buscaForm) {
      buscaForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const origem = document.getElementById("origem").value || "São Paulo (GNU)";
        const destino = document.getElementById("destino").value || "Salvador (SSA)";
        // Aqui você pode salvar os dados ou fazer algo antes de redirecionar
        window.location.href = "resultados.html";
      });
    }

    // Botões de reserva
    document.querySelectorAll(".btn-seguinte").forEach(btn => {
      btn.addEventListener("click", function () {
        const opcao = this.closest(".opcao-viagem");
        localStorage.setItem("reservaConfirmada", opcao.outerHTML);
        window.location.href = "reservas.html";
      });
    });
  });

  function validarCadastro(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const erroEmail = document.getElementById("erro-email");
    const erroGeral = document.getElementById("mensagemErro");
    const recaptchaResponse = grecaptcha.getResponse();

    const emailExistente = "teste@gmail.com";
    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

    if (!email) {
      erroEmail.style.display = "block";
      return false;
    } else {
      erroEmail.style.display = "none";
    }

    if (email === emailExistente) {
      erroGeral.textContent = "Este e-mail já está cadastrado.";
      return false;
    }

    if (!regexSenha.test(senha)) {
      erroGeral.textContent = "A senha deve conter letra maiúscula, número e caractere especial.";
      return false;
    }

    if (recaptchaResponse.length === 0) {
      erroGeral.textContent = "Por favor, confirme que você não é um robô.";
      return false;
    }

    alert("Cadastro realizado com sucesso!");
    return true;
  }
</script>

<?php
$recaptcha = $_POST['g-recaptcha-response'];
$chaveSecreta = "6LeskHArAAAAADDdctQgDmVZXegF_SpIf_RsInOX";
$resposta = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$chaveSecreta&response=$recaptcha");
$retorno = json_decode($resposta);

if ($retorno->success) {
  // Continua com o cadastro
} else {
  // Bloqueia o envio e mostra erro
}
?>
