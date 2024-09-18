import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/configDB";

export class Role extends Model {
    declare id: number;
    declare name: string;
};

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'role',
    tableName: 'roles',
    timestamps: false,
},
);