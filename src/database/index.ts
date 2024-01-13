import { get } from "../env"

const syncronizeDatabase = async () => {

    const databaseDriver = get('DB_DRIVER')

    switch (databaseDriver) {
        case "sequelize":
            const { syncronize } = await import('./connections/sequelize')
            await syncronize()
            break;
        case "mongoose":

            break;
        default:
            break;
    }
}

export { syncronizeDatabase }