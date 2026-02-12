// models/Class.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import School from './School.model';
import User from './User.model';

interface ClassAttributes {
  id: number;
  schoolId: number;
  name: string;
  level: 'PRIMARY' | 'SECONDARY';
  grade?: string;
  teacherId: number;
  maxStudents: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id' | 'grade' | 'maxStudents'> {}

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: number;
  public schoolId!: number;
  public name!: string;
  public level!: 'PRIMARY' | 'SECONDARY';
  public grade?: string;
  public teacherId!: number;
  public maxStudents!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly school?: School;
  public readonly teacher?: User;
}

Class.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: School,
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('PRIMARY', 'SECONDARY'),
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    maxStudents: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
      validate: {
        min: 1,
        max: 100
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'classes',
    timestamps: true,
    underscored: false,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
);

// Associations
Class.belongsTo(School, { foreignKey: 'schoolId', as: 'school' });
Class.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

export default Class;