import { startServer } from "./application/server/index.js"
import { startWatcher } from "./utility/watcher.js"

const cmds = process.argv.slice(2)

const start = cmds[0] == "start"
const startDevelopment = cmds[0] == "start:development"

if (!cmds[0]) {

} else if (start) {

    if (cmds.includes('--dev-mode') || cmds.includes('-D')) {

    }

    startServer()
} else if (startDevelopment) {
    if (cmds.includes("--frontend")) { 
        startWatcher("frontend")
    }else{
        startWatcher("backend")
    }
    
} 