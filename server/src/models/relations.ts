import { Role } from "./role";
import { User } from "./user";
import { Equipment } from "./equipment";
import { Stock } from "./stock";
import { Activity } from "./activity";
import { ActivityDetails } from "./activityDetails";
import { Organization } from "./organizations";
import { Location } from "./location";


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

    // Relación de uno a muchos entre Location y Stock
    Location.hasMany(Stock, {
        foreignKey: 'locationId',
        as: 'stocks',
    });

    Stock.belongsTo(Location, {
        foreignKey: 'locationId',
        as: 'location',
    });

    // Relación de uno a muchos entre Activity y ActivityDetails
    Activity.hasMany(ActivityDetails, {
        foreignKey: 'activityId',
        as: 'activityDetails',
    });

    ActivityDetails.belongsTo(Activity, {
        foreignKey: 'activityId',
        as: 'activity',
    });

    // Relación de uno a muchos entre Stock y ActivityDetails
    Stock.hasMany(ActivityDetails, {
        foreignKey: 'stockId',
        as: 'activityDetails',
    });

    ActivityDetails.belongsTo(Stock, {
        foreignKey: 'stockId',
        as: 'stock',
    });

    // Relación de uno a muchos entre Organization y ActivityDetails
    Organization.hasMany(ActivityDetails, {
        foreignKey: 'organizationId',
        as: 'organizationActivityDetails',
    });

    ActivityDetails.belongsTo(Organization, {
        foreignKey: 'organizationId',
        as: 'organization',
    });

    // relación uno a muchos entre User y Activity
    User.hasMany(Activity, {
        foreignKey: 'userId',
        as: 'activities',
    });

    Activity.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
    });
};