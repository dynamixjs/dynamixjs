import { build } from "esbuild"

const buildRelease = async () => {
    await build({
        entryPoints:"src/index.js",
        outfile: "dist/dynamix",
        bundle: true,
        platform: "node",
        external: "pg-hstore"
    })
}

export { buildRelease }