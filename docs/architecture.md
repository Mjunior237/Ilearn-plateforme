🏗️ Architecture de l'Application iLearn

## 1. Architecture Globale
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ │ │ │ │ │
│ Frontend │────▶│ Backend API │────▶│ Base de │
│ Next.js │ │ Node.js │ │ Données MySQL │
│ Port 3000 │◀────│ Express │◀────│ Sequelize │
│ │ │ Port 5000 │ │ │
└─────────────────┘ └────────┬────────┘ └─────────────────┘
│
┌────────▼────────┐
│ │
│ File Storage │
│ /uploads │
│ │
└─────────────────┘

text

## 2. Architecture Frontend (Next.js App Router)
src/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ └── register/
│ ├── dashboard/
│ │ ├── admin/
│ │ ├── student-primary/
│ │ ├── student-secondary/
│ │ └── student-superior/
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── Header.tsx
│ ├── DashboardHeader.tsx
│ └── Footer.tsx
└── contexts/
└── AuthContext.tsx

text

## 3. Architecture Backend (MVC)
src/
├── config/
│ └── database.ts # Configuration MySQL/Sequelize
├── models/
│ ├── User.model.ts # Modèle utilisateur
│ └── Resource.model.ts # Modèle ressource
├── services/
│ ├── auth.service.ts # Logique d'authentification
│ └── resource.services.ts # Logique des ressources
├── middleware/
│ └── auth.middleware.ts # Middleware JWT
├── routes/
│ ├── auth.route.ts
│ └── resource.route.ts
├── app.ts # Configuration Express
└── server.ts # Point d'entrée

text

## 4. Modèle de Données

### Table `users`
| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| email | VARCHAR(255) | Email unique |
| password | VARCHAR(255) | Hash bcrypt |
| firstName | VARCHAR(100) | Prénom |
| lastName | VARCHAR(100) | Nom |
| role | ENUM | ADMIN, TEACHER_*, STUDENT_* |
| educationLevel | ENUM | PRIMARY, SECONDARY, SUPERIOR |
| isActive | BOOLEAN | Compte actif |
| createdAt | TIMESTAMP | Date création |
| updatedAt | TIMESTAMP | Date modification |

### Table `resources`
| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| title | VARCHAR(200) | Titre |
| description | TEXT | Description |
| type | ENUM | VIDEO, DOCUMENT, SIMULATION, ARCHIVE, ARTICLE, LINK |
| targetLevel | ENUM | PRIMARY, SECONDARY, SUPERIOR, ALL |
| subject | VARCHAR(100) | Matière |
| author | VARCHAR(200) | Auteur |
| filePath | VARCHAR(500) | Chemin du fichier |
| url | VARCHAR(500) | Lien externe |
| isPublic | BOOLEAN | Visibilité |
| viewsCount | INT | Nombre de vues |
| createdAt | TIMESTAMP | Date création |

## 5. Flux de Données

1. **Client** → Requête HTTP → **Frontend** (Next.js)
2. **Frontend** → Fetch API + JWT → **Backend** (Express)
3. **Backend** → Sequelize ORM → **MySQL**
4. **Backend** → Multer → **File System** (/uploads)
5. **Backend** → JSON Response → **Frontend**
6. **Frontend** → Render UI → **Client**

## 6. Sécurité

- ✅ **Mots de passe** : Hash bcrypt (10 rounds)
- ✅ **Authentification** : JWT avec expiration 24h
- ✅ **API** : CORS configuré pour localhost:3000
- ✅ **Fichiers** : Validation des types, limite 100MB
- ✅ **Headers** : Helmet.js pour sécurité HTTP
- ✅ **Variables sensibles** : Fichier .env (ignoré par Git)

## 7. Déploiement

```bash
# Backend
npm run build
npm start

# Frontend
npm run build
npm start