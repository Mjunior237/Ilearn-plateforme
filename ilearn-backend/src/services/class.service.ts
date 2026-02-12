// services/class.service.ts
import Class from '../models/Class.model';
import User from '../models/User.model';
import School from '../models/School.model';

class ClassService {
  async createClass(data: {
    schoolId: number;
    name: string;
    level: 'PRIMARY' | 'SECONDARY';
    grade?: string;
    teacherId: number;
    maxStudents?: number;
  }) {
    // Vérifier que le professeur existe et a le bon rôle
    const teacher = await User.findByPk(data.teacherId);
    if (!teacher) throw new Error('Professeur non trouvé');
    
    const validRoles = ['TEACHER_PRIMARY', 'TEACHER_SECONDARY', 'PROFESSOR_SUPERIOR'];
    if (!validRoles.includes(teacher.role)) {
      throw new Error('L\'utilisateur n\'est pas un professeur');
    }

    // Vérifier que l'école existe
    const school = await School.findByPk(data.schoolId);
    if (!school) throw new Error('École non trouvée');

    return await Class.create(data);
  }

  async getAllClasses() {
    return await Class.findAll({
      include: [
        { model: School, attributes: ['id', 'name', 'type'] },
        { model: User, as: 'teacher', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ],
      order: [['name', 'ASC']]
    });
  }

  async getClassById(id: number) {
    const classItem = await Class.findByPk(id, {
      include: [
        { model: School, attributes: ['id', 'name', 'type'] },
        { model: User, as: 'teacher', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });
    if (!classItem) throw new Error('Classe non trouvée');
    return classItem;
  }

  async getClassesByTeacher(teacherId: number) {
    return await Class.findAll({
      where: { teacherId },
      include: [
        { model: School, attributes: ['id', 'name'] }
      ],
      order: [['name', 'ASC']]
    });
  }

  async getClassesBySchool(schoolId: number) {
    return await Class.findAll({
      where: { schoolId },
      include: [
        { model: User, as: 'teacher', attributes: ['id', 'firstName', 'lastName'] }
      ],
      order: [['level', 'ASC'], ['grade', 'ASC'], ['name', 'ASC']]
    });
  }

  async updateClass(id: number, data: Partial<Class>) {
    const classItem = await Class.findByPk(id);
    if (!classItem) throw new Error('Classe non trouvée');
    return await classItem.update(data);
  }

  async deleteClass(id: number) {
    const classItem = await Class.findByPk(id);
    if (!classItem) throw new Error('Classe non trouvée');
    await classItem.destroy();
    return { message: 'Classe supprimée avec succès' };
  }
}

export const classService = new ClassService();