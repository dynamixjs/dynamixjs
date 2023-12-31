import { existsSync, readFileSync } from 'node:fs'

const parseDml = (dmlPath, keyValues) => {

    if (!existsSync(dmlPath)) return `DML_ERROR: Cant find .dml file at ${dmlPath}`

    const dmlStr = readFileSync(dmlPath, 'utf8')
    const dmlVariables = dmlStr.split(" ").filter(v => {
        return v.startsWith("@dmx:")
    })

    let dmlView = dmlStr

    dmlVariables.map(variable => {
        dmlView = dmlStr.replace(variable, keyValues[variable.replace(/\n/g, "").trim()])
    })

    return dmlView.replace(/\t/g, "")
}

export { parseDml }