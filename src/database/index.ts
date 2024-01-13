import { get } from "../env"

const syncronizeDatabase = async () => {

    const databaseDriver = get('DB_DRIVER')

    switch (databaseDriver) {
        case "sequelize":
            const { database } = await import('./connections/sequelize')
            await database.sync({ alter: true })
            break;
        case "mongoose":

            break;
        default:
            break;
    }
}

export { syncronizeDatabase }