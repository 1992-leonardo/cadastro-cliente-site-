

function limpa_formulario_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('estado').value = ("");

}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value = (conteudo.logradouro);
    document.getElementById('bairro').value = (conteudo.bairro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('estado').value = (conteudo.uf);
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulario_cep();
    alert("CEP não encontrado.");
    document.getElementById('cep').value = ("");
  }
}

function pesquisacep(valor) {

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep !== "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('estado').value = "...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = '//viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

    } //end if.
    else {
      //cep é inválido.
      limpa_formulario_cep();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulario_cep();
  }
}

function formatar(mascara, documento) {
  var i = documento.value.length;
  var saida = mascara.substring(0, 1);
  var texto = mascara.substring(i);

  if (texto.substring(0, 1) != saida) {
    documento.value += texto.substring(0, 1);
  }

}

function idade() {
  var data = document.getElementById("dtnasc").value;
  var dia = data.substr(0, 2);
  var mes = data.substr(3, 2);
  var ano = data.substr(6, 4);
  var d = new Date();
  var ano_atual = d.getFullYear(),
    mes_atual = d.getMonth() + 1,
    dia_atual = d.getDate();

  ano = +ano,
    mes = +mes,
    dia = +dia;

  var idade = ano_atual - ano;

  if (mes_atual < mes || mes_atual == mes_aniversario && dia_atual < dia) {
    idade--;
  }
  return idade;
}

function exibe(i) {
  document.getElementById(i).readOnly = true;
}

function desabilita(i) {
  document.getElementById(i).disabled = true;
}
function habilita(i) {
  document.getElementById(i).disabled = false;
}

function showhide() {
  var div = document.getElementById("newpost");

  if (idade() >= 18) {

    div.style.display = "none";
  }
  else if (idade() < 18) {
    div.style.display = "inline";
  }
}

// Criando a funcionalidade para o botão Cadastrar
document.getElementById("Cadastrar").addEventListener("click", function (event) {
  event.preventDefault(); // impede o formulário de ser enviado do jeito tradicional

  // PEGANDO OS DADOS DO FORMULÁRIO
  const nome = document.getElementById("Nome").value;
  const telefone = document.getElementById("telefone1").value;
  const telefone2 = document.getElementById("telefone2").value;
  const email = document.getElementById("email").value;
  const cep = document.getElementById("cep").value;
  const rua = document.getElementById("rua").value;
  const numero = document.getElementById("numero").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const tipoParceria = document.getElementById("Tipo Contrato").value;
  const pago = document.querySelector('input[name="valor"]:checked')?.value || "nao";
  const valorPago = document.getElementById("valorpago").value;
  const vencimento = document.getElementById("vencimento").value;
  const tipoEmpresa = document.getElementById("tiposempresas").value;
  const cargo = document.getElementById("cargo").value;

  // ENVIANDO OS DADOS PARA O BACK-END USANDO FETCH
  fetch("http://localhost:8080/api/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: nome,
      telefone: telefone,
      telefone2: telefone2,
      email: email,
      cep: cep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      tipoParceria: tipoParceria,
      pago: pago,
      valorPago: valorPago,
      vencimento: vencimento,
      tipoEmpresa: tipoEmpresa,
      cargo: cargo
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }
      return response.json();
    })
    .then(data => {
      alert("Cliente cadastrado com sucesso!");
      // Aqui você pode limpar os campos se quiser:
      document.getElementById("formularioCliente").reset();
    })
    .catch(error => {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar cliente.");
    });

});

// Criando a funcionalidade para o botão cancelar
document.getElementById("Cancelar").addEventListener("click", function (event) {
  const confirmar = confirm("Tem certeza que deseja cancelar e apagar os dados?");
  if (!confirmar) {
    event.preventDefault(); // impede o reset se o usuário cancelar
  }
});

document.getElementById("verClientes").addEventListener("click", function () {
  window.location.href = "assets/html/clientes.html";
});
