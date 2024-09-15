import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/configDB";

export class Activity extends Model {
    declare id: number;
    declare type: 'ADD' | 'WITHDRAWAL';  // Tipo de actividad
    declare quantity: number;
    declare date: Date;
}

Activity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('ADD', 'WITHDRAWAL'),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'activity',
    timestamps: false,
});