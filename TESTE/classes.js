class Pessoa {
    constructor(nome, email, nascimento, telefoneFixo, telefoneCelular) {
        this.nome = nome;
        this.email = email;
        this.nascimento = nascimento;
        this.telefoneFixo = telefoneFixo;
        this.telefoneCelular = telefoneCelular;
    }
}

class Professor extends Pessoa {
    constructor(nome, email, nascimento, telefoneFixo, telefoneCelular, areaAtuacao, matricula, lattes) {
        super(nome, email, nascimento, telefoneFixo, telefoneCelular);
        this.areaAtuacao = areaAtuacao;
        this.matricula = matricula;
        this.lattes = lattes;
    }
}

class Aluno extends Pessoa {
    constructor(nome, email, nascimento, telefoneFixo, telefoneCelular, curso, matricula) {
        super(nome, email, nascimento, telefoneFixo, telefoneCelular);
        this.curso = curso;
        this.matricula = matricula;
    }
}
