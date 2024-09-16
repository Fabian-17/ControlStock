import { sequelize } from './configDB';
import { Sequelize } from 'sequelize';
import { relations } from '../models/relations';

class ConnectDataBase {
    private sequelize: Sequelize;
    private relations: () => void = relations;
    constructor() {
        this.sequelize = sequelize;
        this.relations();
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