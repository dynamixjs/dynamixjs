import { io } from "socket.io-client"

const socket = io('/dev-server')

socket.on('reload', () => window.location.reload())