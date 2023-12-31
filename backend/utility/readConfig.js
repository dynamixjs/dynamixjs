import { existsSync, readFileSync } from 'node:fs'

const readConfig = () => {
    let configPath = process.env.CONFIG_PATH || process.cwd()
        configPath = `${configPath}/dynamix.config.json`
    
    if (!existsSync(configPath)) {
        console.log(`Config file not found at ${configPath}`)
        process.exit(1)
    }

    const config = readFileSync(configPath, 'utf8')

    return JSON.parse(config)
}

export { readConfig }