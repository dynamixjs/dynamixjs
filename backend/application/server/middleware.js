import express from "express"

const cwd = process.cwd()

const useMiddleware = application => {
    application.use(express.static(`${cwd}/frontend/assets`, { prefix: "admin-content/assets" }))
    application.use(express.static(`${cwd}/frontend/public`, { prefix: "admin-content/assets" }))

    application.set('view engine', 'ejs')
    
}

export { useMiddleware }