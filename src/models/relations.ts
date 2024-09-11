import { Role } from "./role";
import { User } from "./user";
import { Equipment } from "./equipment";
import { Stock } from "./stock";

export const relations = (): void => {
    
    // relacion de uno a muchos entre Role y User
    Role.hasMany(User, {
        foreignKey: 'roleId',
        as: 'users',
    });

    User.belongsTo(Role, {
        foreignKey: 'roleId',
        as: 'role',
    });

    // relacion de uno a mucho entre Equipment y Stock
    Equipment.hasMany(Stock, {
        foreignKey: 'equipmentId',
        as: 'stocks',
    });

    Stock.belongsTo(Equipment, {
        foreignKey: 'equipmentId',
        as: 'equipment',
    });
};