import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/configDB';


export class Activity extends Model {
    declare id: number;
    declare withdrawal: string;
    declare added: Date;
};


Activity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    withdrawal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    added: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'activity',
    timestamps: false,
},
);