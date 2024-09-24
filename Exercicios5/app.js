// Classe Tarefa
class Tarefa {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = 'Pendente';
    }

    concluir() {
        this.status = 'Concluída';
    }

    detalhes() {
        return `
            <strong>Nome:</strong> ${this.nome}<br>
            <strong>Descrição:</strong> ${this.descricao}<br>
            <strong>Status:</strong> ${this.status}
        `;
    }
}

// Classe GerenciadorDeTarefas
class GerenciadorDeTarefas {
    #tarefas = [];

    adicionarTarefa(tarefa) {
        this.#tarefas.push(tarefa);
        this.listarTarefas();
    }

    listarTarefas() {
        const lista = document.getElementById('lista-tarefas');
        lista.innerHTML = '';

        this.#tarefas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            const nomeDiv = document.createElement('div');
            nomeDiv.innerHTML = `<span>${tarefa.nome}</span> <span class="badge bg-${tarefa.status === 'Concluída' ? 'success' : 'warning'} ms-2">${tarefa.status}</span>`;

            const btnGroup = document.createElement('div');

            const btnDetalhes = document.createElement('button');
            btnDetalhes.className = 'btn btn-info btn-sm me-2';
            btnDetalhes.textContent = 'Detalhes';
            btnDetalhes.addEventListener('click', () => this.visualizarDetalhes(index));

            const btnConcluir = document.createElement('button');
            btnConcluir.className = 'btn btn-success btn-sm me-2';
            btnConcluir.textContent = 'Concluir';
            btnConcluir.disabled = tarefa.status === 'Concluída';
            btnConcluir.addEventListener('click', () => this.marcarComoConcluida(index));

            const btnRemover = document.createElement('button');
            btnRemover.className = 'btn btn-danger btn-sm';
            btnRemover.textContent = 'Remover';
            btnRemover.addEventListener('click', () => this.removerTarefa(index));

            btnGroup.appendChild(btnDetalhes);
            btnGroup.appendChild(btnConcluir);
            btnGroup.appendChild(btnRemover);

            li.appendChild(nomeDiv);
            li.appendChild(btnGroup);

            lista.appendChild(li);
        });
    }

    marcarComoConcluida(index) {
        this.#tarefas[index].concluir();
        this.listarTarefas();
    }

    removerTarefa(index) {
        if (confirm(`Deseja remover a tarefa "${this.#tarefas[index].nome}"?`)) {
            this.#tarefas.splice(index, 1);
            this.listarTarefas();
        }
    }

    visualizarDetalhes(index) {
        const tarefa = this.#tarefas[index];
        const detalhes = tarefa.detalhes();
        document.getElementById('detalhes-tarefa').innerHTML = detalhes;

        const detalhesModal = new bootstrap.Modal(document.getElementById('detalhesModal'));
        detalhesModal.show();
    }
}

const gerenciador = new GerenciadorDeTarefas();

document.getElementById('form-tarefa').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    if (nome && descricao) {
        const tarefa = new Tarefa(nome, descricao);
        gerenciador.adicionarTarefa(tarefa);

        // Limpa os campos do formulário
        this.reset();
    }
});
