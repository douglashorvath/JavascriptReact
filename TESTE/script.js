document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("formCadastro");
    const camposEspecificos = document.getElementById("camposEspecificos");
    const tipoCadastro = document.getElementsByName("tipoCadastro");

    function aplicarMascaras() {
        $('#telefoneFixo').mask('(00) 0000-0000');
        $('#telefoneCelular').mask('(00) 00000-0000');
    }

    function atualizarFormulario() {
        const tipo = document.querySelector('input[name="tipoCadastro"]:checked').value;
        if (tipo === "Professor") {
            camposEspecificos.innerHTML = `
        <div class="row mb-3">
          <div class="col">
            <label for="areaAtuacao">Área de Atuação</label>
            <input type="text" id="areaAtuacao" name="areaAtuacao" class="form-control" placeholder="Área de Atuação">
            <small class="error-msg" id="error-areaAtuacao"></small>
          </div>
          <div class="col">
            <label for="matriculaProfessor">Matrícula</label>
            <input type="text" id="matriculaProfessor" name="matriculaProfessor" class="form-control" placeholder="Matrícula (5 dígitos)">
            <small class="error-msg" id="error-matriculaProfessor"></small>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label for="lattes">Lattes</label>
            <input type="text" id="lattes" name="lattes" class="form-control" placeholder="Currículo Lattes">
            <small class="error-msg" id="error-lattes"></small>
          </div>
        </div>
      `;
        } else {
            camposEspecificos.innerHTML = `
        <div class="row mb-3">
          <div class="col">
            <label for="curso">Curso</label>
            <input type="text" id="curso" name="curso" class="form-control" placeholder="Curso">
            <small class="error-msg" id="error-curso"></small>
          </div>
          <div class="col">
            <label for="matriculaAluno">Matrícula</label>
            <input type="text" id="matriculaAluno" name="matriculaAluno" class="form-control" placeholder="Matrícula (10 dígitos)">
            <small class="error-msg" id="error-matriculaAluno"></small>
          </div>
        </div>
      `;
        }
    }

    function validarCampo(id, regex, errorMsg) {
        const campo = document.getElementById(id);
        const valor = campo.value.trim();
        const errorElement = document.getElementById(`error-${id}`);
        if (!regex.test(valor)) {
            errorElement.innerText = errorMsg;
            return false;
        } else {
            errorElement.innerText = '';
            return true;
        }
    }

    function validarFormulario() {
        let valido = true;
        valido = validarCampo('nome', /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/, "Nome inválido") && valido;
        valido = validarCampo('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido") && valido;
        valido = validarCampo('telefoneFixo', /^\(\d{2}\) \d{4}-\d{4}$/, "Telefone fixo inválido") && valido;
        valido = validarCampo('telefoneCelular', /^\(\d{2}\) \d{5}-\d{4}$/, "Telefone celular inválido") && valido;

        const tipo = document.querySelector('input[name="tipoCadastro"]:checked').value;
        if (tipo === 'Professor') {
            valido = validarCampo('matriculaProfessor', /^\d{5}$/, "Matrícula inválida (5 dígitos)") && valido;
            valido = validarCampo('areaAtuacao', /.+/, "Área de atuação é obrigatória") && valido;
        } else {
            valido = validarCampo('matriculaAluno', /^\d{10}$/, "Matrícula inválida (10 dígitos)") && valido;
            valido = validarCampo('curso', /.+/, "Curso é obrigatório") && valido;
        }

        return valido;
    }

    // Inicializa o formulário
    atualizarFormulario();
    aplicarMascaras();

    tipoCadastro.forEach(radio => {
        radio.addEventListener("change", atualizarFormulario);
    });

    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validarFormulario()) {
            document.getElementById("resultado").innerText = "Formulário enviado com sucesso!";
        } else {
            document.getElementById("resultado").innerText = "Por favor, corrija os erros.";
        }
    });

    formCadastro.addEventListener("reset", function () {
        document.getElementById("resultado").innerText = "";
        const errorMsgs = document.querySelectorAll(".error-msg");
        errorMsgs.forEach(error => error.innerText = '');
    });
});
