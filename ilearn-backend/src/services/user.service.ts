// services/user.service.ts - CORRECTION
import User from '../models/User.model';

class UserService {
  async getAllUsers() {
    try {
      return await User.findAll({
        attributes: { exclude: ['password'] }, // Exclure password directement
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des utilisateurs: ${error}`);
    }
  }

  async getUserById(id: number) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] } // Exclure password directement
      });
      if (!user) throw new Error('Utilisateur non trouvé');
      return user;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'utilisateur: ${error}`);
    }
  }

  async getUserProfile(userId: number) {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] } // Exclure password directement
      });
      if (!user) throw new Error('Utilisateur non trouvé');
      return user;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du profil: ${error}`);
    }
  }

  async updateUser(id: number, data: any) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Utilisateur non trouvé');

      // Empêcher la modification de certains champs
      const allowedFields = ['firstName', 'lastName', 'age', 'avatar', 'phone'];
      const updateData: any = {};
      
      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          updateData[field] = data[field];
        }
      }

      await user.update(updateData);
      
      // Récupérer l'utilisateur mis à jour sans le mot de passe
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] } // ← CORRECTION ICI
      });
      
      return updatedUser;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur: ${error}`);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Utilisateur non trouvé');
      
      // Soft delete: désactiver au lieu de supprimer
      await user.update({ isActive: false });
      return { message: 'Utilisateur désactivé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la désactivation de l'utilisateur: ${error}`);
    }
  }

  async getUsersByRole(role: string) {
    try {
      return await User.findAll({
        where: { role, isActive: true },
        attributes: { exclude: ['password'] }, // Exclure password directement
        order: [['lastName', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération par rôle: ${error}`);
    }
  }

  async getUsersByEducationLevel(educationLevel: string) {
    try {
      return await User.findAll({
        where: { educationLevel, isActive: true },
        attributes: { exclude: ['password'] }, // Exclure password directement
        order: [['lastName', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération par niveau: ${error}`);
    }
  }
}

export const userService = new UserService();
export default UserService;