import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import ConnectDataBase from './database/connection';
import { config } from './config/config';


class Server {
  private app: Application;
  private port: string | undefined;
private connectDataBase: ConnectDataBase = new ConnectDataBase();

  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.middlewares();
    this.dbConnection();
    this.routes();
  };

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  };

  private dbConnection(): void {
    this.connectDataBase.connect();
  };

  private routes(): void {
    this.app.use(router);
  };

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  };
};

export default Server;