const socket = io()

let anteriores = []

socket.on('connect', () => {
    socket.emit('painel:identifica')
});

socket.on('painel:informa', (data) => {
    const tag_numero = document.getElementById('numero_guiche')
    tag_numero.innerHTML = data.numero_guiche
})

socket.on('painel:proximo', (data) => {
    const tag_proxima = document.getElementById('proxima_senha')
    tag_proxima.innerHTML = data.proxima_senha
    console.log(data)
})

socket.on('painel:chama_senha', (data) =>{
    const tag_senha = document.getElementById('senha')
    const tag_guiche = document.getElementById('numero_guiche')
    tag_senha.innerHTML = data.senha
    tag_senha.classList.remove('blink')
    tag_senha.offsetWidth
    tag_senha.classList.add('blink')
    tag_guiche.innerHTML = data.numero_guiche
    audio.play()
    anteriores.unshift({"senha": data.senha, "numero_guiche" : data.numero_guiche})
    if(anteriores.length > 1){
        anteriores.forEach((anterior, index) => {
            if(index > 0){
                const tag_senha_anterior = document.getElementById(`senha_anterior[${index}]`)
                tag_senha_anterior.innerHTML = anterior.senha
                const tag_guiche_anterior = document.getElementById(`guiche_anterior[${index}]`)
                tag_guiche_anterior.innerHTML = anterior.numero_guiche
            }
        })
    }
})

const imagem = document.getElementById('logo')
const audio = document.getElementById('notificacao')

imagem.addEventListener('click', () => {
    // "Desbloqueia" o áudio
    audio.play().then(() => {
        audio.pause()
        audio.currentTime = 0
    });
    console.log('clicou')
});