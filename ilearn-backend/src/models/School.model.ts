// models/School.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SchoolAttributes {
  id: number;
  name: string;
  type: 'PRIMARY' | 'SECONDARY' | 'SUPERIOR';
  address?: string;
  city?: string;
  country?: string;
  createdAt?: Date;
}

interface SchoolCreationAttributes extends Optional<SchoolAttributes, 'id' | 'address' | 'city' | 'country'> {}

class School extends Model<SchoolAttributes, SchoolCreationAttributes> implements SchoolAttributes {
  public id!: number;
  public name!: string;
  public type!: 'PRIMARY' | 'SECONDARY' | 'SUPERIOR';
  public address?: string;
  public city?: string;
  public country?: string;
  public readonly createdAt!: Date;
}

School.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('PRIMARY', 'SECONDARY', 'SUPERIOR'),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'schools',
    timestamps: true,
    underscored: false,
    createdAt: 'createdAt',
    updatedAt: false // Pas de updatedAt pour les écoles
  }
);

export default School;