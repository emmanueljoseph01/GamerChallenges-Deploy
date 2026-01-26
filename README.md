# apo-GamerChallenges
```
/
├── src/
│   ├── app.js                    # Point d'entrée de l'application
│   ├── configs/
│   │   └── sequelize.client.js   # Configuration de la BDD
│   ├── controllers/
│   │   ├── base.controller.js    # Controller générique (CRUD)
│   │   ├── challenge.controller.js
│   │   ├── game.controller.js
│   │   ├── participation.controller.js
│   │   ├── role.controller.js
│   │   ├── user.controller.js
│   │   └── vote.controller.js
│   ├── middlewares/
│   │   └── errorHandler.js       # Gestion centralisée des erreurs
│   ├── models/
│   │   ├── index.model.js        # Associations entre models
│   │   ├── challenge.model.js
│   │   ├── game.model.js
│   │   ├── participation.model.js
│   │   ├── role.model.js
│   │   ├── user.model.js
│   │   └── vote.model.js
│   ├── routes/
│   │   ├── index.route.js        # Router principal
│   │   ├── challenge.route.js
│   │   ├── game.route.js
│   │   ├── participation.route.js
│   │   ├── role.route.js
│   │   ├── user.route.js
│   │   └── vote.route.js
│   └── scripts/
│       ├── createTables.js       # Création des tables
│       └── seedingTables.js      # Données de test
├── .env.example
└── package.json
```
## Installation

```bash
# 1. Installer les dépendances
npm install

cd server > npm i
cd client > npm i

# 2. Copier et configurer le fichier .env
cp .env.example .env
# Puis modifier les valeurs dans .env

# 3. Créer les tables dans PostgreSQL
npm run db:create

# 4. (Optionnel) Ajouter des données de test
npm run db:seed

# 5. (Optionnel) Reset les données de test
npm run db:reset

# 6. Lancer le serveur
npm run dev
```