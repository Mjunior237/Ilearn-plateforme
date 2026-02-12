// services/school.service.ts
import School from '../models/School.model';

class SchoolService {
  async createSchool(data: {
    name: string;
    type: 'PRIMARY' | 'SECONDARY' | 'SUPERIOR';
    address?: string;
    city?: string;
    country?: string;
  }) {
    try {
      return await School.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'école: ${error}`);
    }
  }

  async getAllSchools() {
    try {
      return await School.findAll({
        order: [['name', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des écoles: ${error}`);
    }
  }

  async getSchoolById(id: number) {
    try {
      const school = await School.findByPk(id);
      if (!school) throw new Error('École non trouvée');
      return school;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'école: ${error}`);
    }
  }

  async updateSchool(id: number, data: any) {
    try {
      const school = await School.findByPk(id);
      if (!school) throw new Error('École non trouvée');
      return await school.update(data);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'école: ${error}`);
    }
  }

  async deleteSchool(id: number) {
    try {
      const school = await School.findByPk(id);
      if (!school) throw new Error('École non trouvée');
      await school.destroy();
      return { message: 'École supprimée avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'école: ${error}`);
    }
  }

  async getSchoolsByType(type: string) {
    try {
      return await School.findAll({
        where: { type },
        order: [['name', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération par type: ${error}`);
    }
  }

  async countSchools() {
    try {
      return await School.count();
    } catch (error) {
      throw new Error(`Erreur lors du comptage des écoles: ${error}`);
    }
  }
}

export const schoolService = new SchoolService();
export default SchoolService;