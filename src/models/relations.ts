import { Role } from "./role";
import { User } from "./user";

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
};