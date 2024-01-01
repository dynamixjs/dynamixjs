import { readdirSync, readFileSync } from 'node:fs'
import * as ejs from "ejs"

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

const getPageView = (pageIndex) => {

    let templateStr
    let pagePath

    const module = pageIndex.split(":")[0]
    const page = pageIndex.split(":")[1]

    if (module == "main") {
        pagePath = `${cwd}/frontend/resources/views/pages/${page}.ejs`
    }else{
        pagePath = `${cwd}/plugins/${module}/${page}.ejs`
    }

    templateStr = readFileSync(pagePath, 'utf-8')
    return ejs.render(templateStr)
}

const indexAdminPage = async (request, response) => {
    const indexPath = `${cwd}/frontend/resources/views/index-admin.ejs`
    response.render(indexPath, { 
        entryPoints: getEntryPoints(), 
        pageView: getPageView(request.params.page) 
    })
}

export { indexAdminPage }