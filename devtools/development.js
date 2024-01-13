const esbuild = require('esbuild')
const chokidar = require('chokidar')
const { spawn, execSync } = require('child_process')
const path = require('path')

const l = console.log
const isProduction = process.argv.slice(2)[0] == "--production"
const bufferToString = bufferData => Buffer.from(bufferData).toString('utf8')
const printStd = data => l(bufferToString(data).trim())
const outDir = isProduction ? "release/" : ".dynamix/__development/"

let backendChildProcess, frontendChildProcess

const startBackendDev = () => {
    backendChildProcess = spawn("node", [`${outDir}dynamix`], { env: { ...process.env, FORCE_COLOR: true }})
    backendChildProcess.stdout.on('data', printStd)
    backendChildProcess.stderr.on('data', printStd)
    backendChildProcess.stdin.on('close', () => execSync(`rimraf ${outDir}`))
}


const buildBackend = async () => {
    try {
        const buildResult = await esbuild.build({
            entryPoints: ["backend/index.ts"],
            outfile: path.join(outDir, "dynamix"),
            target: "node18",
            platform: "node",
            bundle: true,
            minify: isProduction,
            external: ["esbuild"],
            define: {
                
            }
        })    

        if (backendChildProcess) {
           if (!backendChildProcess.killed) {
                backendChildProcess.kill()
           }
        }

        startBackendDev()

    } catch (error) {
        l(error)
    }
}

const buildFrontend = () => {

}

chokidar.watch("backend").on("change", path => {
    buildBackend()
})

chokidar.watch("frontend").on("change", path => {
    buildBackend()
})

buildBackend()

