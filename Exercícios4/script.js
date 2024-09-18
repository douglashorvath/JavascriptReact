document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dynamicForm');
    const professorFields = document.getElementById('professorFields');
    const alunoFields = document.getElementById('alunoFields');
    const formularioResultado = document.getElementById('dadosExibidos');

    //UPDATE PARA ALUNO/PROFESSOR
    function updateFormFields() {
        const tipoSelecionado = document.querySelector('input[name="tipo"]:checked').value;
        if (tipoSelecionado === 'Professor') {
            professorFields.style.display = 'block';
            alunoFields.style.display = 'none';
        } else {
            professorFields.style.display = 'none';
            alunoFields.style.display = 'block';
        }
    }

    document.querySelectorAll('input[name="tipo"]').forEach(radio => {
        radio.addEventListener('change', updateFormFields);
    });


    //VALIDAÇÕES

    function validateNome() {
        const nome = document.getElementById('nome').value.trim();
        const nomeError = document.getElementById('nomeError');

        // Valida se há pelo menos duas palavras (nome e sobrenome), mas permite mais
        if (!/^([a-zA-Z]+(?:\s+[a-zA-Z]+)+)$/.test(nome)) {
            nomeError.textContent = 'Nome deve conter pelo menos um nome e um sobrenome.';
            return false;
        } else {
            nomeError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const email = document.getElementById('email').value;
        const emailError = document.getElementById('emailError');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = 'Email inválido.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validateDataNascimento() {
        const dataNascimento = document.getElementById('dataNascimento').value;
        const dataNascimentoError = document.getElementById('dataNascimentoError');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) {
            dataNascimentoError.textContent = 'Data de nascimento inválida.';
            return false;
        } else {
            dataNascimentoError.textContent = '';
            return true;
        }
    }

    function validateTelefoneFixo() {
        const telefoneFixo = document.getElementById('telefoneFixo').value;
        const telefoneFixoError = document.getElementById('telefoneFixoError');
        if (!/\(\d{2}\) \d{4}-\d{4}/.test(telefoneFixo)) {
            telefoneFixoError.textContent = 'Telefone fixo inválido.';
            return false;
        } else {
            telefoneFixoError.textContent = '';
            return true;
        }
    }

    function validateTelefoneCelular() {
        const telefoneCelular = document.getElementById('telefoneCelular').value;
        const telefoneCelularError = document.getElementById('telefoneCelularError');
        if (!/\(\d{2}\) \d{5}-\d{4}/.test(telefoneCelular)) {
            telefoneCelularError.textContent = 'Telefone celular inválido.';
            return false;
        } else {
            telefoneCelularError.textContent = '';
            return true;
        }
    }

    function validateArea() {
        const area = document.getElementById('area').value;
        const areaError = document.getElementById('areaError');
        if (document.querySelector('input[name="tipo"]:checked').value === 'Professor' && !area) {
            areaError.textContent = 'Área de atuação é obrigatória para professores.';
            return false;
        } else {
            areaError.textContent = '';
            return true;
        }
    }

    function validateMatriculaProfessor() {
        const matriculaProfessor = document.getElementById('matriculaProfessor').value;
        const matriculaProfessorError = document.getElementById('matriculaProfessorError');
        if (!/^\d{5}$/.test(matriculaProfessor)) {
            matriculaProfessorError.textContent = 'Matrícula do professor deve conter 5 dígitos.';
            return false;
        } else {
            matriculaProfessorError.textContent = '';
            return true;
        }
    }

    function validateCurso() {
        const curso = document.getElementById('curso').value;
        const cursoError = document.getElementById('cursoError');
        if (document.querySelector('input[name="tipo"]:checked').value === 'Aluno' && !curso) {
            cursoError.textContent = 'Curso é obrigatório para alunos.';
            return false;
        } else {
            cursoError.textContent = '';
            return true;
        }
    }

    function validateMatriculaAluno() {
        const matriculaAluno = document.getElementById('matriculaAluno').value;
        const matriculaAlunoError = document.getElementById('matriculaAlunoError');
        if (!/^\d{10}$/.test(matriculaAluno)) {
            matriculaAlunoError.textContent = 'Matrícula do aluno deve conter 10 dígitos.';
            return false;
        } else {
            matriculaAlunoError.textContent = '';
            return true;
        }
    }

    function validateForm() {
        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isDataNascimentoValid = validateDataNascimento();
        const isTelefoneFixoValid = validateTelefoneFixo();
        const isTelefoneCelularValid = validateTelefoneCelular();
        const isAreaValid = validateArea();
        const isMatriculaProfessorValid = validateMatriculaProfessor();
        const isCursoValid = validateCurso();
        const isMatriculaAlunoValid = validateMatriculaAluno();
        return isNomeValid && isEmailValid && isDataNascimentoValid && isTelefoneFixoValid && isTelefoneCelularValid && isAreaValid && isMatriculaProfessorValid && isCursoValid && isMatriculaAlunoValid;
    }

    //MÁSCARAS

    function formatPhoneInput(input) {
        input.addEventListener('input', () => {
            let value = input.value.replace(/\D/g, '');
            if (input.id === 'telefoneFixo') {
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
                }
            } else if (input.id === 'telefoneCelular') {
                if (value.length <= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
                }
            }
            input.value = value;
        });
    }

    formatPhoneInput(document.getElementById('telefoneFixo'));
    formatPhoneInput(document.getElementById('telefoneCelular'));

    //LIMPA OS CAMPOS DE ERRO
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');

    }

    //PARA QUNADO ENVIA O FORMULÁRIO
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault(); // Impede o envio do formulário se a validação falhar
        }
    });
    
    form.addEventListener('blur', (event) => {
        if (event.target.matches('input')) {
            switch (event.target.id) {
                case 'nome':
                    validateNome();
                    break;
                case 'email':
                    validateEmail();
                    break;
                case 'dataNascimento':
                    validateDataNascimento();
                    break;
                case 'telefoneFixo':
                    validateTelefoneFixo();
                    break;
                case 'telefoneCelular':
                    validateTelefoneCelular();
                    break;
                case 'area':
                    validateArea();
                    break;
                case 'matriculaProfessor':
                    validateMatriculaProfessor();
                    break;
                case 'curso':
                    validateCurso();
                    break;
                case 'matriculaAluno':
                    validateMatriculaAluno();
                    break;
            }
        }
    }, true);

    form.addEventListener('reset', () => {
        clearErrors();
        updateFormFields(); // Atualiza o formulário ao redefinir
    });

    //QUANDO ENVIA
    form.addEventListener('submit', (event) => {
        alert("Form submission");
        if (!validateForm()) {
            event.preventDefault(); // Impede o envio do formulário se a validação falhar
        } else {
            const tipo = document.querySelector('input[name="tipo"]:checked').value;

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const dataNascimento = document.getElementById('dataNascimento').value;
            const telefoneFixo = document.getElementById('telefoneFixo').value;
            const telefoneCelular = document.getElementById('telefoneCelular').value;

            if (tipo === 'Professor') {
                const area = document.getElementById('area').value;
                const matriculaProfessor = document.getElementById('matriculaProfessor').value;
                const lattes = document.getElementById('lattes').value;

                const professor = new Professor(nome, email, dataNascimento, telefoneFixo, telefoneCelular, area, matriculaProfessor, lattes);
                formularioResultado.innerHTML = `
                    <h2>Dados do Professor:</h2>
                    <p><strong>Nome:</strong> ${professor.nome}</p>
                    <p><strong>Email:</strong> ${professor.email}</p>
                    <p><strong>Data de Nascimento:</strong> ${professor.dataNascimento}</p>
                    <p><strong>Telefone Fixo:</strong> ${professor.telefoneFixo}</p>
                    <p><strong>Telefone Celular:</strong> ${professor.telefoneCelular}</p>
                    <p><strong>Área de Atuação:</strong> ${professor.area}</p>
                    <p><strong>Matrícula Professor:</strong> ${professor.matriculaProfessor}</p>
                    <p><strong>Lattes:</strong> ${professor.lattes}</p>
                `;
            } else if (tipo === 'Aluno') {
                const curso = document.getElementById('curso').value;
                const matriculaAluno = document.getElementById('matriculaAluno').value;

                const aluno = new Aluno(nome, email, dataNascimento, telefoneFixo, telefoneCelular, curso, matriculaAluno);
                formularioResultado.innerHTML = `
                    <h2>Dados do Aluno:</h2>
                    <p><strong>Nome:</strong> ${aluno.nome}</p>
                    <p><strong>Email:</strong> ${aluno.email}</p>
                    <p><strong>Data de Nascimento:</strong> ${aluno.dataNascimento}</p>
                    <p><strong>Telefone Fixo:</strong> ${aluno.telefoneFixo}</p>
                    <p><strong>Telefone Celular:</strong> ${aluno.telefoneCelular}</p>
                    <p><strong>Curso:</strong> ${aluno.curso}</p>
                    <p><strong>Matrícula Aluno:</strong> ${aluno.matriculaAluno}</p>
                `;
            }
            event.preventDefault(); // Impede o envio do formulário após mostrar os dados
        }
    });

    updateFormFields();
});
