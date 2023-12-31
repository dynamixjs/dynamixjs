import { Admin, Post, Setting } from "./models.js"

const syncDatabase = async () => {
    await Admin.sync({ alter: true })
    await Setting.sync({ alter: true })
    await Post.sync({ alter: true })
}

export { syncDatabase }