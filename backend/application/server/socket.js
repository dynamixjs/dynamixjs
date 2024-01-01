
const useSocket = (socket) => {
    const devServerIO = socket.of('/dev-server')

    devServerIO.on('connection', (client) => {

        client.on('reload', () => devServerIO.emit('reload'))
        client.on('compile_error', (errMsg) => devServerIO.emit('rcompile_error', errMsg))

    })
}

export { useSocket }