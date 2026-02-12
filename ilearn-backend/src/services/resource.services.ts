import { Request, Response } from 'express';
import sequelize from '../config/database';
import fs from 'fs';
import path from 'path';

// GET - Récupérer toutes les ressources
export const getAllResources = async (req: Request, res: Response) => {
  try {
    const { level, type, subject } = req.query;
    
    let query = 'SELECT * FROM resources WHERE isPublic = true';
    const params: any[] = [];
    
    if (level && typeof level === 'string') {
      query += ' AND targetLevel = ?';
      params.push(level);
    }
    
    if (type && typeof type === 'string') {
      query += ' AND type = ?';
      params.push(type);
    }
    
    if (subject && typeof subject === 'string') {
      query += ' AND subject = ?';
      params.push(subject);
    }
    
    query += ' ORDER BY createdAt DESC';
    
    const [resources] = await sequelize.query(query, { replacements: params });
    
    res.json(resources);
  } catch (error: any) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des ressources' });
  }
};

// GET - Récupérer une ressource par ID
export const getResourceById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }
    
    const [resources] = await sequelize.query(
      'SELECT * FROM resources WHERE id = ?',
      { replacements: [id] }
    );
    
    if (resources.length === 0) {
      return res.status(404).json({ error: 'Ressource non trouvée' });
    }

    // Incrémenter le compteur de vues
    await sequelize.query(
      'UPDATE resources SET viewsCount = viewsCount + 1 WHERE id = ?',
      { replacements: [id] }
    );
    
    res.json(resources[0]);
  } catch (error: any) {
    console.error('Error fetching resource:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la ressource' });
  }
};

// GET - Recherche de ressources (si vous voulez l'implémenter plus tard)
export const searchResources = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Terme de recherche requis' });
    }
    
    const [resources] = await sequelize.query(
      'SELECT * FROM resources WHERE isPublic = true AND (title LIKE ? OR description LIKE ?) ORDER BY createdAt DESC',
      { replacements: [`%${q}%`, `%${q}%`] }
    );
    
    res.json(resources);
  } catch (error: any) {
    console.error('Error searching resources:', error);
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
};

// POST - Upload une nouvelle ressource
// POST - Upload une nouvelle ressource
// POST - Upload une nouvelle ressource
export const uploadResource = async (req: Request, res: Response) => {
  console.log('=== UPLOAD RESOURCE START ===');
  
  try {
    const { 
      title, 
      description, 
      type, 
      targetLevel, 
      subject, 
      author, 
      source,
      url,
      isPublic 
    } = req.body;

    // Validation
    if (!title || !type || !targetLevel) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        success: false,
        error: 'Les champs title, type et targetLevel sont obligatoires' 
      });
    }

    let filePath: string | undefined = undefined;
    if (req.file) {
      filePath = `/uploads/${req.file.filename}`;
    }

    // ✅ SOLUTION: Remplacer NULL par des chaînes vides
    const replacements = [
      title,                    // ? 1: title
      description || '',        // ? 2: description (chaîne vide au lieu de null)
      type.toUpperCase(),       // ? 3: type
      targetLevel.toUpperCase(),// ? 4: targetLevel
      subject || '',           // ? 5: subject (chaîne vide au lieu de null)
      author || '',           // ? 6: author (chaîne vide au lieu de null)
      source || '',           // ? 7: source (chaîne vide au lieu de null)
      url || '',              // ? 8: url (chaîne vide au lieu de null)
      filePath || '',         // ? 9: filePath (chaîne vide au lieu de null)
      isPublic === 'true' || isPublic === true || isPublic === '1' ? 1 : 0, // ? 10: isPublic
      0                        // ? 11: viewsCount
    ];

    const [result] = await sequelize.query(
      `INSERT INTO resources (
        title, description, type, targetLevel, subject, author, 
        source, url, filePath, isPublic, viewsCount, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      {
        replacements
      }
    );

    // Récupérer l'ID inséré - différentes méthodes selon la base de données
    let insertId;
    
    if ((result as any).insertId !== undefined) {
      // MySQL
      insertId = (result as any).insertId;
    } else if ((result as any).lastInsertRowid !== undefined) {
      // SQLite
      insertId = (result as any).lastInsertRowid;
    } else {
      // PostgreSQL ou autre - récupérer le dernier ID
      const [idResult] = await sequelize.query('SELECT LAST_INSERT_ID() as id');
      insertId = (idResult as any)[0]?.id;
    }

    console.log('✅ Inserted ID:', insertId);

    if (!insertId) {
      throw new Error('Impossible de récupérer l\'ID de la ressource insérée');
    }

    const [newResource] = await sequelize.query(
      'SELECT * FROM resources WHERE id = ?',
      { replacements: [insertId] }
    );

    res.status(201).json({
      success: true,
      message: 'Ressource créée avec succès',
      data: newResource[0]
    });

  } catch (error: any) {
    console.error('❌ Error creating resource:', error);
    
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (deleteError) {
        console.error('Error deleting file:', deleteError);
      }
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la création de la ressource',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
// DELETE - Supprimer une ressource
export const deleteResource = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }
    
    // D'abord récupérer la ressource pour connaître le fichier
    const [resources] = await sequelize.query(
      'SELECT * FROM resources WHERE id = ?',
      { replacements: [id] }
    );
    
    if (resources.length === 0) {
      return res.status(404).json({ error: 'Ressource non trouvée' });
    }
    
    const resource = resources[0] as any;
    
    // Supprimer le fichier associé s'il existe
    if (resource.filePath) {
      const fullPath = path.join(process.cwd(), resource.filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    
    // Supprimer la ressource de la base
    await sequelize.query(
      'DELETE FROM resources WHERE id = ?',
      { replacements: [id] }
    );

    res.json({ message: 'Ressource supprimée avec succès' });
  } catch (error: any) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la ressource' });
  }
};

// PUT - Mettre à jour une ressource
export const updateResource = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }
    
    const { 
      title, 
      description, 
      type, 
      targetLevel, 
      subject, 
      author, 
      source,
      url,
      isPublic 
    } = req.body;
    
    // Vérifier que la ressource existe
    const [existingResources] = await sequelize.query(
      'SELECT * FROM resources WHERE id = ?',
      { replacements: [id] }
    );
    
    if (existingResources.length === 0) {
      return res.status(404).json({ error: 'Ressource non trouvée' });
    }
    
    const updates: string[] = [];
    const params: any[] = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      params.push(title);
    }
    
    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description || null);
    }
    
    if (type !== undefined) {
      updates.push('type = ?');
      params.push(type);
    }
    
    if (targetLevel !== undefined) {
      updates.push('targetLevel = ?');
      params.push(targetLevel);
    }
    
    if (subject !== undefined) {
      updates.push('subject = ?');
      params.push(subject || null);
    }
    
    if (author !== undefined) {
      updates.push('author = ?');
      params.push(author || null);
    }
    
    if (source !== undefined) {
      updates.push('source = ?');
      params.push(source || null);
    }
    
    if (url !== undefined) {
      updates.push('url = ?');
      params.push(url || null);
    }
    
    if (isPublic !== undefined) {
      updates.push('isPublic = ?');
      params.push(isPublic === 'true' || isPublic === true);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
    }
    
    params.push(id);
    
    const query = `UPDATE resources SET ${updates.join(', ')} WHERE id = ?`;
    
    await sequelize.query(query, { replacements: params });
    
    // Récupérer la ressource mise à jour
    const [updatedResource] = await sequelize.query(
      'SELECT * FROM resources WHERE id = ?',
      { replacements: [id] }
    );
    
    res.json({
      message: 'Ressource mise à jour avec succès',
      resource: updatedResource[0]
    });
  } catch (error: any) {
    console.error('Error updating resource:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la ressource' });
  }
};

// GET - Télécharger une ressource
export const downloadResource = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }
    
    const [resources] = await sequelize.query(
      'SELECT * FROM resources WHERE id = ?',
      { replacements: [id] }
    );
    
    if (resources.length === 0) {
      return res.status(404).json({ error: 'Ressource non trouvée' });
    }
    
    const resource = resources[0] as any;
    
    // ✅ CORRECTION: Si c'est un lien externe, rediriger
    if (resource.type === 'LINK' && resource.url) {
      return res.redirect(resource.url);
    }
    
    // ✅ CORRECTION: Si c'est un fichier uploadé
    if (resource.filePath) {
      // Construire le chemin complet correct
      // Supprimer le premier slash si présent
      const cleanPath = resource.filePath.startsWith('/') 
        ? resource.filePath.substring(1) 
        : resource.filePath;
      
      const filePath = path.join(process.cwd(), cleanPath);
      
      console.log('📁 Looking for file at:', filePath);
      
      if (!fs.existsSync(filePath)) {
        console.error('❌ File not found:', filePath);
        return res.status(404).json({ error: 'Fichier non trouvé sur le serveur' });
      }
      
      // Incrémenter le compteur de vues
      await sequelize.query(
        'UPDATE resources SET viewsCount = viewsCount + 1 WHERE id = ?',
        { replacements: [id] }
      );
      
      // Déterminer le nom du fichier pour le téléchargement
      const fileName = `${resource.title}${path.extname(resource.filePath)}`;
      
      // Envoyer le fichier
      return res.download(filePath, fileName);
    }
    
    return res.status(404).json({ error: 'Aucun fichier ou lien associé à cette ressource' });
    
  } catch (error: any) {
    console.error('Error downloading resource:', error);
    res.status(500).json({ error: 'Erreur lors du téléchargement de la ressource' });
  }

};