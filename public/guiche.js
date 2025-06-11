const socket = io()

socket.on('connect', () => {
  const numero_guiche = localStorage.getItem('numero_guiche')
  if(numero_guiche){
    socket.emit('guiche:atualizar_id', { "numero_guiche" : numero_guiche })
  }
});

socket.on('guiche:informa', (data) => {
    const tag_numero = document.getElementById('numero_guiche')
    tag_numero.innerHTML = data.numero_guiche
})

socket.on('guiche:proximo', (data) => {
    const tag_proxima = document.getElementById('proxima_senha')
    tag_proxima.innerHTML = data.proxima_senha
})

socket.on('guiche:numero_em_uso', (data) => {
    alert(`O número ${data.numero_guiche} já está em uso por outro guichê! Volte e escolha um outro número.`)
    window.location.href = '/'
})

function open_guiche(){
    const numero =  prompt("Qual o número do seu guichê?")
    if(parseInt(numero)){
        localStorage.setItem('numero_guiche', numero);
        socket.emit('guiche:selecionado', { "numero_guiche" : numero })
        window.location.href = '/guiche'
    }else{
        alert('Número de guichê inválido!')
    }
}

function open_painel(){
    window.location.href = '/painel'
}

function voltar(){
    const senha = document.getElementById('proxima_senha')
    if(parseInt(senha.innerHTML) > 1){
        socket.emit('guiche:volta_senha', { "proxima_senha": senha.innerHTML} )
    }else{
        alert('Não é possível voltar a senha.')
    }
}

function avancar(){
    const senha = document.getElementById('proxima_senha')
    socket.emit('guiche:avanca_senha', { "proxima_senha": senha.innerHTML} )
}

function chama_senha(){
    const numero_guiche = localStorage.getItem('numero_guiche')
    socket.emit('guiche:chama_senha', { "numero_guiche" : numero_guiche })
}