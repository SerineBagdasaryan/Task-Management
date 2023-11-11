import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
    path: ".env",
});

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['./db/entities/*.entity.{js,ts}'],
    migrationsTableName: 'task_management_migrations',
    migrations: ['./src/database/migrations/*.ts'],
});
