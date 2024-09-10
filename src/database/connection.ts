import { sequelize } from './configDB';
import { Sequelize } from 'sequelize';


class ConnectDataBase {
    private sequelize: Sequelize;
    constructor() {
        this.sequelize = sequelize;
    };

    async connect() {

        // Sincroniza la base de datos
        try {
            await this.sequelize.sync();
            console.log('Base de datos conectada');
        } catch (err) {
            console.log('Error al conectar la base de datos', err);
        };
    };
};


export default ConnectDataBase;