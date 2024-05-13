function calcularMediaProgresso() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let totalProgresso = 0;

    tarefas.forEach(tarefa => {
        totalProgresso += tarefa.status;
    });

    if (tarefas.length > 0) {
        return totalProgresso / tarefas.length;
    } else {
        return 0;
    }
}

function atualizarProgressoTotal() {
    const progressoTotal = calcularMediaProgresso();
    const progressoTotalElement = document.querySelector("#progresso-total");
    if (progressoTotalElement) {
        progressoTotalElement.value = progressoTotal;
    }
}

function inc(id){
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let tarefa = tarefas.find(tarefa => tarefa.id === id);
    
    if (tarefa.status === 100) {
        return;
    }

    tarefa.status += 10;
    if (tarefa.status > 100) {
        tarefa.status = 100;
    }
    
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    const progressoElement = document.querySelector("#" + id + " progress");
    if (progressoElement) {
        progressoElement.value += 10;
    }

    atualizarProgressoTotal();
}

function dec(id){
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let tarefa = tarefas.find(tarefa => tarefa.id === id);
    tarefa.status -= 10;
    if (tarefa.status < 0) tarefa.status = 0;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    const progressoElement = document.querySelector("#" + id + " progress");
    if (progressoElement) {
        progressoElement.value -= 10;
    }

    atualizarProgressoTotal();
}

let tarefasCarregadas = false; 

document.addEventListener("DOMContentLoaded", function() {
    if (!tarefasCarregadas) {
        carregarTarefas();
        tarefasCarregadas = true;
    }
});

function carregarTarefas() {
    const listaTarefas = document.querySelector("#lista-de-tarefas");
    listaTarefas.innerHTML = ''; 
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach(tarefa => {
        card(tarefa);
        const progressoElement = document.querySelector("#" + tarefa.id + " progress");
        if (progressoElement) {
            progressoElement.value = tarefa.status;
        }
    });
    atualizarProgressoTotal();
}
