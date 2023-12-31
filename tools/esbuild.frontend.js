import chalk from "chalk"
import { build } from "esbuild"
import postCssPlugin from "esbuild-style-plugin"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import * as fs from 'fs-extra'

const log = console.log

const flags = process.argv.slice(2).filter(v => v.startsWith("--"))

const runBuild = async (isProduction) => {

    const cwd = process.cwd()
    const jsEntrypointPath = `${cwd}/frontend/resources/js/app.js`
    const hmrEntrypointPath = `${cwd}/frontend/resources/js/hmr.js`
    const cssEntrypointPath = `${cwd}/frontend/resources/css/app.css`
    const outDir = `${cwd}/frontend/public/admin-contents`

    fs.rmdirSync(outDir, { })

    const buildResult = await build({
        entryPoints: [
            jsEntrypointPath, 
            !isProduction ? hmrEntrypointPath : undefined, 
            cssEntrypointPath
        ],
        outdir:  outDir,
        bundle: true,
        format: 'esm',
        minify: isProduction,
        plugins: [
            postCssPlugin({
                postcss: {
                    plugins: [tailwindcss, autoprefixer]
                }
            })
        ]
    })

    if (buildResult.errors.length > 0) return log(chalk.blue("[esbuild]"), chalk.red("Esbuild compile error"), buildResult.errors)
    
    log(chalk.blue("[esbuild]"), chalk.green("Esbuild compile success"))
}

runBuild(flags[0] && flags[0] == "--production")