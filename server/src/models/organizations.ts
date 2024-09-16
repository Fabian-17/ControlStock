import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/configDB';

export class Organization extends Model {
  declare id: number;
  declare name: string;
  declare address: string;
};

Organization.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'organization',
    timestamps: false,
},
);