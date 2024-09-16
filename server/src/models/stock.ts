import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/configDB';


export class Stock extends Model {
    declare id: number;
    declare quantity: number;
};

Stock.init({
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
    modelName: 'stock',
    timestamps: false,
},
);