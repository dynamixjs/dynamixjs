
import { syncronizeDatabase } from "./database"
import { startServer } from "./server"
import { printInfoText } from "./utility/util"

printInfoText("Syncronize database...")
syncronizeDatabase()

printInfoText("Starting server...")
startServer()
