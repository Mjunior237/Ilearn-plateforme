
3. **File → Save As →** `C:\Users\flaub\iLearn\docs\ARCHITECTURE.md`

---

### 📌 **Étape 2 : Créer SPECIFICATIONS.md**

1. **Nouveau fichier Notepad**
2. **Colle ce contenu :**

```markdown
# 📋 Spécifications Fonctionnelles - iLearn Platform

## 1. Présentation du Projet

**iLearn** est une plateforme éducative intelligente permettant aux étudiants d'accéder à des ressources pédagogiques adaptées à leur niveau (Primaire, Secondaire, Supérieur) et aux enseignants de partager du contenu éducatif.

**Objectifs :**
- ✅ Centraliser les ressources pédagogiques
- ✅ Adapter le contenu au niveau de l'étudiant
- ✅ Faciliter le travail des enseignants
- ✅ Offrir une interface simple et intuitive

## 2. Acteurs du Système

| Acteur | Description | Fonctionnalités |
|--------|-------------|-----------------|
| **Visiteur** | Non authentifié | • Consulter page d'accueil<br>• S'inscrire<br>• Se connecter |
| **Étudiant** | Primaire, Secondaire, Supérieur | • Consulter cours<br>• Télécharger ressources<br>• Voir progression<br>• Rechercher |
| **Enseignant** | Crée du contenu | • Uploader ressources<br>• Gérer cours<br>• Suivre étudiants |
| **Administrateur** | Gère la plateforme | • Gérer utilisateurs<br>• Gérer ressources<br>• Statistiques |

## 3. Cas d'Utilisation

### 3.1 Authentification
| ID | UC-001 |
|----|--------|
| **Titre** | Inscription |
| **Acteur** | Visiteur |
| **Précondition** | Être sur la page d'inscription |
| **Postcondition** | Compte créé, redirection vers login |
| **Scénario** | 1. Saisir email, mot de passe, infos personnelles<br>2. Choisir rôle et niveau<br>3. Valider le formulaire<br>4. Recevoir confirmation |

| ID | UC-002 |
|----|--------|
| **Titre** | Connexion |
| **Acteur** | Tous |
| **Précondition** | Avoir un compte |
| **Postcondition** | Session ouverte, token JWT |
| **Scénario** | 1. Saisir email/mot de passe<br>2. Authentification<br>3. Redirection dashboard |

### 3.2 Gestion des Ressources
| ID | UC-003 |
|----|--------|
| **Titre** | Upload de ressource |
| **Acteur** | Administrateur |
| **Précondition** | Être authentifié avec rôle ADMIN |
| **Postcondition** | Ressource créée en base |
| **Scénario** | 1. Accéder au dashboard admin<br>2. Cliquer "Upload Resource"<br>3. Remplir formulaire<br>4. Sélectionner fichier<br>5. Valider |

| ID | UC-004 |
|----|--------|
| **Titre** | Consulter ressources |
| **Acteur** | Étudiant |
| **Précondition** | Être connecté |
| **Postcondition** | Affichage des ressources |
| **Scénario** | 1. Accéder au dashboard<br>2. Filtrer par niveau/matière<br>3. Rechercher<br>4. Cliquer pour télécharger |

## 4. Règles de Gestion

### RG1 - Authentification
- Le mot de passe doit contenir au moins 6 caractères
- L'email doit être unique
- Le token JWT expire après 24h

### RG2 - Ressources
- Types autorisés : PDF, DOC, PPT, MP4, ZIP, RAR
- Taille maximale : 100 Mo
- Niveaux : PRIMARY, SECONDARY, SUPERIOR, ALL
- Visibilité : Public (tous) ou Privé (admin)

### RG3 - Utilisateurs
- Un étudiant a un niveau (PRIMARY, SECONDARY, SUPERIOR)
- Un enseignant peut avoir plusieurs spécialités
- Un administrateur a tous les droits

## 5. Contraintes Techniques

| Domaine | Technologie | Version |
|---------|-------------|---------|
| Frontend | Next.js | 15.x |
| Frontend | React | 19.x |
| Frontend | TypeScript | 5.x |
| Frontend | Tailwind CSS | 3.x |
| Backend | Node.js | 18+ |
| Backend | Express | 4.x |
| Backend | TypeScript | 5.x |
| Base de données | MySQL | 8.0+ |
| ORM | Sequelize | 6.x |
| Authentification | JWT | - |
| Upload | Multer | - |

## 6. Interface Utilisateur

### 6.1 Dashboard Étudiant - Primaire
- Design ludique, couleurs vives
- Grands boutons
- Icônes explicites
- Navigation simplifiée

### 6.2 Dashboard Étudiant - Secondaire
- Interface plus sérieuse
- Statistiques de progression
- Filtres de recherche
- Organisation par matières

### 6.3 Dashboard Étudiant - Supérieur
- Interface professionnelle
- Recherche avancée
- Filtres multiples
- Vue détaillée

### 6.4 Dashboard Administrateur
- Tableau de bord analytique
- Graphiques et statistiques
- Gestion CRUD complète
- Actions rapides

## 7. Tests d'Acceptation

| ID | Test | Critère de succès |
|----|------|-------------------|
| T1 | Inscription avec email valide | Compte créé, redirection |
| T2 | Connexion identifiants corrects | Token reçu, dashboard |
| T3 | Upload fichier PDF | Ressource visible |
| T4 | Téléchargement fichier | Fichier téléchargé |
| T5 | Filtrage par niveau | Affichage filtré |
| T6 | Recherche par mot-clé | Résultats pertinents |

---

📅 **Dernière mise à jour :** Février 2026