import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/configDB';


export class ActivityDetails extends Model{
    declare id: number;
    declare quantity: number;
};

ActivityDetails.init({
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
    modelName: 'activitydetails',
    timestamps: false,
},
);