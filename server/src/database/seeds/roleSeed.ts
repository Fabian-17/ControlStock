import { Role } from "../../models/role";

export const seedRoles = async () => {
    await Role.bulkCreate([
        { name: 'admin' },
        { name: 'user' },
    ]);
};