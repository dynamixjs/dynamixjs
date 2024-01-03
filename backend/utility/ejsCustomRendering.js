import ejs from 'ejs'
import { readFileSync } from 'fs'

const render = (path = "", file = "", opts = {}) => {
    const createEJSStr = (fname) => readFileSync(`${path}/${fname}`, 'utf-8')
    opts.include = (fname, opts = {}) => {
        let ejsView
        try {
            ejsView = ejs.render(createEJSStr(fname), opts)
        }catch(e){
            ejsView = e
        }
        return ejsView
    }
    
    let ejsView
    try {
        ejsView = ejs.render(createEJSStr(file), opts)
    }catch(e){
        ejsView = e
    }
    return ejsView
}

export { render }