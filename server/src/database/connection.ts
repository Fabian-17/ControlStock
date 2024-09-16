import { sequelize } from './configDB';
import { Sequelize } from 'sequelize';
import { relations } from '../models/relations';
import { seedRoles } from './seeds/roleSeed';

class ConnectDataBase {
    private sequelize: Sequelize;
    private relations: () => void = relations;
    private seedRoles: () => void = seedRoles;
    constructor() {
        this.sequelize = sequelize;
        this.relations();
        this.seedRoles();
    };

    async connect() {

        // Sincroniza la base de datos
        try {
            await this.sequelize.sync({force: false});
            console.log('Base de datos conectada');
        } catch (err) {
            console.log('Error al conectar la base de datos', err);
        };
    };
};


export default ConnectDataBase;