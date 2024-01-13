import express, { Express } from "express"

const useMiddleware = (app: Express) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

export { useMiddleware }