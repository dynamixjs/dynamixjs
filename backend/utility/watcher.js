import { watch } from "chokidar"
import { spawn } from "child_process"
import chalk from "chalk"
import { io } from "socket.io-client"

const socket = io('http://localhost:3030/dev-server')

const startWatcher = async () => {
    const log = console.log
    const cwd = process.cwd()
    const backendDir = `${cwd}/backend`
    const frontendDir = `${cwd}/frontend/resources`

    let backendChildProcess, frontendChildProcess
    let restartBackendDev = () => {}
    let restartFrontendDev = () => {}


    const startBackendDev = () => {
        const bufferToString = (bufferData) => Buffer.from(bufferData).toString('utf-8').trim()
        backendChildProcess  = spawn("node", ["backend/index.js", "start"], { env: { ...process.env, FORCE_COLOR: true }})
        backendChildProcess.stdin.on("data", (data) => {
            const stdInStr = bufferToString(data)
            if (stdInStr == "r") return restartBackendDev()
        })
        backendChildProcess.stdout.on("data", (data) => {
            log(bufferToString(data))
        })
        backendChildProcess.stderr.on("data", (data) => {
            log(bufferToString(data))
        })
    }

    const startFrontendDev = () => {
        const bufferToString = (bufferData) => Buffer.from(bufferData).toString('utf-8').trim()
        frontendChildProcess  = spawn("node", ["tools/esbuild.frontend.js"], { env: { ...process.env, FORCE_COLOR: true }})
        frontendChildProcess.stdin.on("data", (data) => {
            const stdInStr = bufferToString(data)
            if (stdInStr == "r") return restartFrontendDev()
        })
        frontendChildProcess.stdout.on("data", (data) => {
            log(bufferToString(data))
            socket.emit('reload')
        })
        frontendChildProcess.stderr.on("data", (data) => {
            log(bufferToString(data))
        })
    }

    restartBackendDev = () => {
        if(!backendChildProcess.killed) {
            log(chalk.blue("Restarting..."))
            backendChildProcess.kill()
            startBackendDev()
        }
    }

    restartFrontendDev = () => {
        if(!frontendChildProcess.killed) {
            log(chalk.blue("[esbuild]"), "Recompiling...")
            frontendChildProcess.kill()
            startFrontendDev()
        }
    }

    watch(backendDir).on('change', async (event, path) => {
        restartBackendDev()
    })

    watch(frontendDir).on('change', async (event, path) => {
        restartFrontendDev()
    })

    startBackendDev()

    log(chalk.blue("[esbuild]"), "Compiling frontend assets")
    startFrontendDev()
}

export { startWatcher }