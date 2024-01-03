import { existsSync, readFileSync, readdirSync } from "node:fs"
import { get } from "node:https"
import { createRequire } from 'node:module'
import plugin from "tailwindcss"

const r = createRequire(import.meta.url)
const pluginPath = `${process.cwd()}/plugins`

const loadPlugin = async pluginMetadata => {
    const modulePath = `${pluginPath}/${pluginMetadata.moduleName}/${pluginMetadata.module}`
    if (existsSync(modulePath)) return await import(modulePath)
}

const loadPluginsInfo = async (pluginName = "") => {
   
   const plugins = []
   const avaiablePlugins =  readdirSync(pluginPath)
   
   avaiablePlugins.map( async plugin => {
        const pluginMetadataPath = `${pluginPath}/${plugin}/metadata.json`
        if (!existsSync(pluginMetadataPath)) return
        const metadata = r(pluginMetadataPath)
        metadata['moduleName'] = plugin
        plugins.push(metadata)

    })

    if (pluginName !== "") return plugins.filter(v => v == pluginName)[0]
    return plugins
}

export { loadPluginsInfo, loadPlugin }