import { connectDatabase } from "./connection.js"
import { DataTypes } from "sequelize"

const database = connectDatabase()

if (!database) {
    console.log("No database connection configuration available")
    process.exit(1)
}

const Admin = database.define('admin', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Setting = database.define('setting', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: "site-settings"
    },
    siteName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    siteDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    siteLogo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currentTemplate: {
        type: DataTypes.STRING,
    }
})

const Post = database.define('post', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    excerpt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
            key: "id",
            model: Admin
        }
    },
})


export { Admin, Setting, Post}