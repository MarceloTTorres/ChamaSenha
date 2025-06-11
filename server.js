import express from 'express'
import * as http from 'http'
import { Server } from 'socket.io'
import { join } from 'path'
import path from 'node:path';
import { fileURLToPath } from 'url';
import * as os from 'os'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (request, response) => {
    response.sendFile(join(__dirname, 'index.html'))
})
app.get('/guiche', (request, response) => {
    response.sendFile(join(__dirname, 'guiche.html'))
})
app.get('/painel', (request, response) => {
    response.sendFile(join(__dirname, 'painel.html'))
})

server.listen(80, () => {
    const interfaces = os.networkInterfaces();
    let addresses = [];

    for (const interfaceId in interfaces) {
        if (interfaces.hasOwnProperty(interfaceId)) {
            const interfaceArray = interfaces[interfaceId];
            for (const address of interfaceArray) {
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
    }
    console.log(`O servidor do ChamaSenha Etec está rodando em: http://${addresses[0]}/`)
})

let guiches = []
let painel
import  Numero  from './files/start.json' assert { type: 'json' }
const comeca_em = Numero
let proximo = parseInt(comeca_em.numero) + parseInt(1)

io.on('connection', (socket) => {
    socket.on('guiche:selecionado', (data) => {
        if(parseInt(data.numero_guiche)){
            const num_guiche = data.numero_guiche
            guiches.forEach(guiche => {
                if(guiche.numero === data.numero_guiche){
                    socket.emit('guiche:numero_em_uso', { "numero_guiche" : guiche.numero })
                    return
                }
            })
            guiches.push({ numero: num_guiche, id: socket.id } )
            console.log(`Guichê ${num_guiche} (${socket.id}) conectou ao servidor.`)
        }
    })

    socket.on('guiche:atualizar_id', (data) => {
        guiches.forEach(guiche => {
            if(guiche.numero === data.numero_guiche){
                guiche.id = socket.id
                socket.emit('guiche:informa', { "numero_guiche" : guiche.numero })
                proxima_senha()
                return
            }
        });
    })

    socket.on('guiche:volta_senha', (data) => {
        const prox_senha = data.proxima_senha
        if(parseInt(prox_senha)){
            proximo--
            proxima_senha()
        }
    })

    socket.on('guiche:avanca_senha', (data) => {
        const prox_senha = data.proxima_senha
        if(parseInt(prox_senha)){
            proximo++
            proxima_senha()
        }
    })

    socket.on('guiche:chama_senha', (data) => {
        const guiche = data.numero_guiche
        io.to(painel).emit('painel:chama_senha', {"senha":proximo, "numero_guiche" : guiche})
        proximo++
        proxima_senha()
    })


    socket.on('painel:identifica', () =>{
        painel = socket.id
    })

    
})

setTimeout(function(){
    proxima_senha()
}, 5000)

function proxima_senha(){
    io.emit('guiche:proximo', { "proxima_senha" : proximo })
}