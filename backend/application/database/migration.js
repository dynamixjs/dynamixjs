import { loadPlugin, loadPluginsInfo } from "../../utility/pluginsLoader.js"
import { connectDatabase } from "./connection.js"
import { Admin, Post, Setting } from "./models.js"

const syncDatabase = async () => {
    await Admin.sync({ alter: true })
    await Setting.sync({ alter: true })
    await Post.sync({ alter: true })

    const plugins = await loadPluginsInfo()
    plugins.map( async pluginInfo => {
        const plugin  = await loadPlugin(pluginInfo)
        if (plugin) plugin.createDatabaseTable(connectDatabase())
    })
}

export { syncDatabase }