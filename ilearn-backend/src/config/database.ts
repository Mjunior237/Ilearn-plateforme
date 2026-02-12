import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  'ilearn_db',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
    define: {
      underscored: false, // ← IMPORTANT: false pour camelCase
      freezeTableName: true,
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;