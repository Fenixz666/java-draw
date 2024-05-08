document.querySelector("#botao-cadastrar").addEventListener("click", () => {

    const form = document.querySelector("form")

    const tarefa = {
        id: "id_" + new Date().getTime(),
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        pontos: form.pontos.value
    }

    validar(tarefa)

    salvar(tarefa)

})

function salvar (tarefa) {
    const tarefas = JSON.parse( localStorage.getItem("tarefas") ) || []
    tarefas.push(tarefa)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    window.location.href = "index.html"
}

function validar(tarefa){
    limparErros()

    if (tarefa.titulo.trim() == ""){
        document.querySelector("#titulo").classList.add("is-error")
        document.querySelector("#titulo-erro").innerText = "o título é obrigatório"
    }

    if (tarefa.descricao.trim() == "" || tarefa.descricao.length < 10){
        document.querySelector("#descricao").classList.add("is-error")
        document.querySelector("#descricao-erro").innerText = "a descrição deve ter pelo menos 10 caracteres"
    }
    
    if (tarefa.pontos <= 0){
        document.querySelector("#pontos").classList.add("is-error")
        document.querySelector("#pontos-erro").innerText = "pontos deve ser maior que zero"
    }
}

function limparErros(){
    const campos = document
                .querySelectorAll("input.is-error, textarea.is-error")

    campos
        .forEach(input => input.classList.remove("is-error") )

    document.querySelectorAll(".nes-field span")
            .forEach( span => span.innerText = "")

    
}

