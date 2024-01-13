const esbuild = require('esbuild')
const chokidar = require('chokidar')
const { spawn, execSync } = require('child_process')
const path = require('path')

const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server)

const l = console.log
const isProduction = process.argv.slice(2)[0] == "--production"
const bufferToString = bufferData => Buffer.from(bufferData).toString('utf8')
const printStd = data => l(bufferToString(data).trim())
const outDir = isProduction ? "release/" : ".dynamix/__development/"

let child

const startBackendDev = () => {
    child = spawn("node", [`${outDir}dynamix`], { env: { ...process.env, FORCE_COLOR: true }})
    child.stdout.on('data', printStd)
    child.stderr.on('data', printStd)
    child.stdin.on('close', () => isProduction ? null : execSync(`rimraf ${outDir}`))
}


const buildBackend = async () => {
    try {
        const buildResult = await esbuild.build({
            entryPoints: ["src/index.ts"],
            outfile: path.join(outDir, "dynamix"),
            target: "node18",
            platform: "node",
            bundle: true,
            minify: isProduction,
            external: ["esbuild"],
            define: {
                ['process.env.DEBUG'] : `${!isProduction}`
            }
        })    

        if (!isProduction) {
            if (child) {
                if (!child.killed) {
                     child.kill()
                }
             }
     
             startBackendDev()
        }

    } catch (error) {
        l(error)
    }
}

const buildFrontend = () => {

}

if (!isProduction) {
    chokidar.watch("src").on("change", path => {
        console.log("\nRecompiling... \n")
        buildBackend()
    })

    chokidar.watch("resources/public").on("change", path => {
        
    })

    chokidar.watch("resources/views").on("change", path => {
        
    })

    app.use(express.static("assets"))

    server.listen(8080, () => {
        console.log("Development server running...")
    })
}

buildBackend()



