export interface Config<T> {
    PORT: T;
    DB_NAME: T;
    DB_USER: T;
    DB_PASSWORD: T;
    DB_HOST: T;
    DB_PORT: T;
    SECRET_KEY: T;
}