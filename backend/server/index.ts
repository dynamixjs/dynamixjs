import express from 'express'
import { createServer } from 'http2'
import { printInfoText } from '../utility/util'

const expressApplication = express()
const server = createServer(expressApplication)


const startServer = () => {
    server.listen(3030, () => {
        printInfoText("Server ready")
    })
}

export { startServer }