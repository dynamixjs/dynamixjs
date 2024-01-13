import 'dotenv/config'

const get = (varName: string) => {
    return process.env[varName]
}

export { get }