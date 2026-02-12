import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

type EducationLevel = 'PRIMARY' | 'SECONDARY' | 'SUPERIOR';

type UserRole =
  | 'STUDENT_PRIMARY'
  | 'STUDENT_SECONDARY'
  | 'STUDENT_SUPERIOR'
  | 'TEACHER_PRIMARY'
  | 'TEACHER_SECONDARY'
  | 'PROFESSOR_SUPERIOR'
  | 'ADMIN';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  educationLevel: EducationLevel;
  role: UserRole;
  age?: number;
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'age'
    | 'avatar'
    | 'phone'
    | 'isEmailVerified'
    | 'isActive'
    | 'lastLogin'
    | 'createdAt'
    | 'updatedAt'
  > {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {

  declare id: number;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare educationLevel: EducationLevel;
  declare role: UserRole;
  declare age?: number;
  declare avatar?: string;
  declare phone?: string;
  declare isEmailVerified: boolean;
  declare isActive: boolean;
  declare lastLogin?: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    educationLevel: {
      type: DataTypes.ENUM('PRIMARY', 'SECONDARY', 'SUPERIOR'),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(
        'STUDENT_PRIMARY',
        'STUDENT_SECONDARY',
        'STUDENT_SUPERIOR',
        'TEACHER_PRIMARY',
        'TEACHER_SECONDARY',
        'PROFESSOR_SUPERIOR',
        'ADMIN'
      ),
      allowNull: false,
    },

    age: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    phone: DataTypes.STRING,

    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    lastLogin: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

/* HASH PASSWORD */
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

export default User;
