/* eslint-disable */
import { config } from 'dotenv';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: false,
  entities: [join(__dirname, './src/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, './src/database/migrations/*.{ts,js}')],
};

export const AppDataSource = new DataSource(dataSourceOptions);
