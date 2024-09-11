import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/configDB";


export class User extends Model {
    declare id: number;
    declare userName: string;
    declare password: string;
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'user',
    timestamps: false,
},
);