import { Role } from "../../models/role";

export const seedRoles = async () => {
    const roles = ['admin', 'user'];
  
    try {
      // se recorren los roles y verificamos si ya existen en la base de datos
      for (const roleName of roles) {
        const roleExists = await Role.findOne({ where: { name: roleName } });
        
        if (!roleExists) {
          // Si el rol no existe, es creado
          await Role.create({ name: roleName });
          console.log(`Role ${roleName} created.`);
        } else {
          console.log(`Role ${roleName} already exists.`);
        }
      }
    } catch (error) {
      console.log('Error seeding roles:', error);
    }
  };