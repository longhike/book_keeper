import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config()
const password: string | undefined = process.env.MYSQL_PASSWORD;

const db = new Sequelize('books', 'root', password, {
    host: 'localhost',
    dialect: 'mysql'
  });

export default db;