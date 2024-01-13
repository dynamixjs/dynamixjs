import { DataTypes, ModelAttributes } from "sequelize";

const AdminSchema: ModelAttributes = {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
}

export { AdminSchema }