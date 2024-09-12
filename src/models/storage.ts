import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/configDB";

export class Storage extends Model {
    declare id: number;
    declare quantity: number;
};

Storage.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'storage',
    timestamps: false,
},
);