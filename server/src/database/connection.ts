import { sequelize } from './configDB';
import { Sequelize } from 'sequelize';
import { relations } from '../models/relations';
import { seedRoles } from './seeds/roleSeed';


class ConnectDataBase {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = sequelize;
    };

    async connect() {

        try {

            relations();

            // Sincroniza la base de datos
            await this.sequelize.sync({ force: false });

            console.log('Database connected');
            
            // Ejecutar los seeds una vez que la base de datos esté sincronizada
            await seedRoles();
        } catch (error) {
            console.log('Error connecting to the database', error);
        };
    
    };
};


export default ConnectDataBase;