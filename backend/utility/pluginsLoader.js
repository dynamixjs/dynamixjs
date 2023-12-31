import { readdirSync } from "node:fs"
import { get } from "node:https"

const pluginPath = `${process.cwd()}/plugins`
const plugins = readdirSync(pluginPath, { })

const loadHttpActions = async (application) => {

    application.get('/plugin/:action', async (request, response) => {
        const actionParams = request.params.action.split(':')
        const pluginModulePath = `${pluginPath}/${actionParams[0]}/main.js`
        if (!await import(pluginModulePath)) return response.send(`Plugin ${actionParams[0]} not found`)
        const { getActions } = await import(pluginModulePath)
        const action = getActions().filter(v => v.actionName == actionParams[1])[0]
        response.send(action.call())
    })
}

export { loadHttpActions }