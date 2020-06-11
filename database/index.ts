import * as dotenv from 'dotenv';
import { ConnectionOptions, createConnection } from 'typeorm';

import User from './entities/User.entities';

dotenv.config();

const entities = [User];

const DB_CONFIG = {
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD
};

const connectionOptions: ConnectionOptions = {
  entities,
  type: 'mysql',
  database: DB_CONFIG.DB_NAME,
  synchronize: true,
  logging: true,
  host: DB_CONFIG.DB_HOST,
  port: 3306,
  username: DB_CONFIG.DB_USERNAME,
  password: DB_CONFIG.DB_PASSWORD
};

export default connectionOptions;