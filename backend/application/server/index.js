import express from 'express'
import chalk from 'chalk'
import { createServer } from 'node:http'
import { useRouter } from './router.js'
import { useMiddleware } from './middleware.js'
import { readConfig } from '../../utility/readConfig.js'
import { loadHttpActions } from '../../utility/pluginsLoader.js'
import { syncDatabase } from '../database/migration.js'
import { Server } from 'socket.io'
import { useSocket } from './socket.js'

const host = readConfig().server?.host || "localhost"
const port = readConfig().server?.port || 3030
const application = express()
const server = createServer(application)
const socket = new Server(server)

const log = console.log

useMiddleware(application)
useRouter(application)
useSocket(socket)
loadHttpActions(application)

const startServer = async () => {
    log(chalk.blue("[info]"), "Syncronizing database...")
    await syncDatabase()
    log(chalk.blue("[info]"), "Complete.")
    log(chalk.blue("[info]"), "Starting server...")
    server.listen(port, host, () => log(chalk.blue("[info]"), `Server running at http://${host}:${port}`))
}

export { startServer }