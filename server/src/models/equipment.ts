import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/configDB";


export class Equipment extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare dateAdded: Date;
};


Equipment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateAdded: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'equipment',
    timestamps: false,
},
);