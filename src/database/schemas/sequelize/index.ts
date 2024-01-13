import { DataTypes, ModelAttributes } from "sequelize";

const AdminSchema: ModelAttributes = {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
}

export { AdminSchema }