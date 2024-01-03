import { readdirSync, readFileSync } from 'node:fs'
import { loadPluginsInfo } from '../../utility/pluginsLoader.js'
import prettify from 'html-prettify'
import { render } from '../../utility/ejsCustomRendering.js'

const cwd = process.cwd()

const getEntryPoints = () => {
    let jsEntryPoints = ""
    let cssEntryPoints = ""

    const jsFiles = readdirSync(`${cwd}/frontend/public/admin-contents/js`)
    const cssFiles = readdirSync(`${cwd}/frontend/public/admin-contents/css`)
    
    jsFiles
        .filter(v => v.endsWith('.js'))
        .map(v => jsEntryPoints = `${jsEntryPoints}\n<script type="text/javascript" src="/admin-contents/js/${v}"></script>`)
    
    cssFiles
        .filter(v => v.endsWith('.css'))
        .map(v => cssEntryPoints = `${cssEntryPoints}\n<link rel="stylesheet" href="/admin-contents/css/${v}" />`)

    return {
        jsEntryPoints: jsEntryPoints,
        cssEntryPoints: cssEntryPoints
    }
}

const createSidenavMenus = async () => {
    const menus = [
        {
            title: "Posts",
            icon: "",
            action: "main:post-listing"
        },
        {
            title: "Template",
            icon: "",
            action: "main:templates"
        },
        {
            title: "Plugin",
            icon: "",
            action: "main:plugins"
        }
    ]

    const allPlugins = await loadPluginsInfo()
    const plugins = allPlugins.filter(p => p.showInSidemenu)
    plugins.map(p => {
        menus.push({
            title: p.name,
            icon: p.icon,
            action: `plugin:${p.moduleName}`
        })
    })

    return menus
}

const indexAdminPage = async (request, response) => {
    const pages = request.params.page.split(':')
    const path = `${cwd}/frontend/resources/views/`
    const mainPath = `${cwd}/frontend/resources/views/pages/`
    const pluginPath = `${cwd}/plugins/${pages[0]}/views/pages`
    const html = render(path, 'index-admin.ejs', { 
        entryPoints: getEntryPoints(),
        sideMenus: await createSidenavMenus(),
        pageView: render(pages[0] == "main" ? mainPath : pluginPath, `${pages[1]}.ejs`)
    })

    response.send(prettify(html))
}

export { indexAdminPage }