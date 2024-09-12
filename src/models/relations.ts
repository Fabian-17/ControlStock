import { Role } from "./role";
import { User } from "./user";
import { Equipment } from "./equipment";
import { Stock } from "./stock";
import { Activity } from "./activity";
import { ActivityDetails } from "./activityDetails";
import { Organization } from "./organizations";
import { Location } from "./location";
import { Storage } from "./storage";

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

    // tabla intermedia entre stock y activity
    Stock.belongsToMany(Activity, {
        through: ActivityDetails,
        foreignKey: 'stockId',
        as: 'activities',
    });

    Activity.belongsToMany(Stock, {
        through: ActivityDetails,
        foreignKey: 'activityId',
        as: 'stocks',
    });

    // tabla intermedia entre equipment y location
    Equipment.belongsToMany(Location, {
        through: Storage,
        foreignKey: 'equipmentId',
        as: 'locations',
    });

    Location.belongsToMany(Equipment, {
        through: Storage,
        foreignKey: 'locationId',
        as: 'equipments',
    });

    // relacion de uno a muchos entre Organization y Storage para que sirva de referencia entre compradores
    // y de donde se obtiene el producto
    Organization.hasMany(Storage, {
        foreignKey: 'organizationId',
        as: 'storages',
    });

    Storage.belongsTo(Organization, {
        foreignKey: 'organizationId',
        as: 'organization',
    });
};