function apagar (id) {
    const tarefas = JSON.parse ( localStorage.getItem("tarefas"))
    const tarefasAtualizadas = tarefas.filter ( tarefa => tarefa.id != id)
    localStorage.setItem("tarefas", JSON.stringify( tarefasAtualizadas) )

    document.querySelector("#" + id).remove()
}