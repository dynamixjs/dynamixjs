import { Sequelize } from "sequelize";
import { get } from "../../env"

const connection = get("SQL_CONNECTION")

let database: Sequelize 

switch (connection) {
    case "sqlite":
        database = new Sequelize({
            dialect: connection,
            storage: get("SQLITE_PATH"),
            logging: false
        })
        break;
    case "mysql":
        database = new Sequelize(get("MYSQL_URI")!, {
            database: get('MYSQL_DBNAME'),
            username: get("MYSQL_USERNAME"),
            password: get("MYSQL_PASSWORD"),
            logging: false
        })
        break;
    default:
        break;
}

const syncronize = async () => {
    await import("../models/sequelize")
    await database.sync({ alter: true })
}

export { database, syncronize }





