import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/configDB";


export class User extends Model {
    declare id: number;
    declare userName: string;
    declare password: string;
    declare roleId: number;
    declare role: {
        name: string;
    };
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
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'role',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'user',
    timestamps: false,
},
);