import { database } from "../../connections/sequelize"
import { AdminSchema } from "../../schemas/sequelize"

const Admin = database.define('admin', AdminSchema)


export { Admin }