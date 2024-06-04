import { DataSource } from "typeorm"

export const appDataSource: DataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'test_cli',
    synchronize: true,
    });