import { io } from "socket.io-client"

let ws

window.onload = () => {
    ws = new io()

    const displayError = (error) => {

    }
    
    ws.on('reloadPage', ()=> {

    })
    ws.on('scriptError', (errorText)=> {
        
    })
}