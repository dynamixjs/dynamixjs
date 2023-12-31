import { Sequelize } from "sequelize"
import { readConfig } from "../../utility/readConfig.js";

const connectDatabase = () => {
    let database;
    const config = readConfig()
    const sqliteConnection = config?.database?.dbConnection == "sqlite"
    const mysqlConnection = config?.database?.dbConnection == "mysql"

    if (sqliteConnection) {
        database = new Sequelize({
            dialect: "sqlite",
            storage: "tmp/db.sqlite3",
            logging: false
        })

        return database
    }

}

export { connectDatabase }