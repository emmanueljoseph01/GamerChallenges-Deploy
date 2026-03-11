# GamerChallenges - Plateforme communautaire de défis gaming

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

GamerChallenges est une application web fullstack (API RESTful + Client) permettant aux joueurs de s'inscrire, de relever des défis sur différents jeux vidéo, et de voter pour les meilleures participations.

> **Contexte :** Ce projet a été réalisé dans le cadre d'un travail d'études en équipe. J'ai personnellement conçu et développé la majeure partie du back-end, de la modélisation de la base de données jusqu'à la sécurisation des routes et l'implémentation métier.

---

## Technologies utilisées

* **Back-end :** Node.js, Express
* **Base de données :** PostgreSQL, Sequelize
* **Front-end :** JavaScript, HTML5, CSS3
* **DevOps & Outils :** Git, GitHub, Docker

---

## Conception Back-end

**Sécurité et Authentification :**
* Hachage des mots de passe avec Argon2
* Authentification stateless via JWT
* Protection des headers HTTP avec Helmet
* Rate limiting (100 req / 15 min) pour prévenir le brute-force
* CORS restreint aux origines autorisées
* Sanitisation des entrées contre les injections XSS

**Contrôle des accès :**
* `isAuthenticated` — vérifie le JWT sur les routes protégées
* `checkRole(["admin"])` — vérifie le rôle par son nom en base
* `isOwnerOrAdmin` — vérifie que l'utilisateur est propriétaire de la ressource ou admin avant toute modification

**Robustesse et standardisation :**
* Codes HTTP standardisés via la librairie `http-status-codes`
* Gestion des erreurs centralisée dans un middleware global, gérée par des `next(error)`
* Validation systématique des requêtes entrantes via un middleware dédié en amont des contrôleurs

---

## Routes de l'API

> Base URL : `/api`
>
> Légende : Public · Membre · Admin · Propriétaire ou Admin

### Auth — `/api/auth`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | `/register` | Public | Créer un compte |
| POST | `/login` | Public | Se connecter, retourne un JWT |
| POST | `/logout` | Public | Se déconnecter |
| GET | `/me` | Membre | Récupérer l'utilisateur connecté |

### Jeux — `/api/games`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/` | Public | Liste tous les jeux |
| GET | `/:id` | Public | Détail d'un jeu |
| GET | `/:id/challenges` | Public | Challenges d'un jeu |
| POST | `/` | Membre | Créer un jeu |
| PATCH | `/:id` | Membre | Modifier un jeu |
| DELETE | `/:id` | Admin | Supprimer un jeu |

### Challenges — `/api/challenges`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/` | Public | Liste tous les challenges |
| GET | `/:id` | Public | Détail d'un challenge |
| GET | `/:id/details` | Public | Challenge + créateur + jeu + participations |
| GET | `/user/:userId` | Public | Challenges d'un utilisateur |
| POST | `/` | Membre | Créer un challenge |
| PATCH | `/:id` | Proprio/Admin | Modifier un challenge |
| DELETE | `/:id` | Admin | Supprimer un challenge |

### Participations — `/api/participations`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/` | Public | Liste toutes les participations |
| GET | `/:id` | Public | Détail d'une participation |
| GET | `/:id/details` | Public | Participation + votes + challenge + jeu |
| GET | `/challenge/:challengeId` | Public | Participations d'un challenge |
| GET | `/user/:userId` | Public | Participations d'un utilisateur |
| POST | `/` | Membre | Soumettre une participation |
| PATCH | `/:id` | Proprio/Admin | Modifier une participation |
| DELETE | `/:id` | Admin | Supprimer une participation |

### Votes — `/api/votes`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/` | Public | Liste tous les votes |
| GET | `/:id` | Public | Détail d'un vote |
| GET | `/user/:userId` | Public | Votes d'un utilisateur |
| GET | `/participation/:participationId` | Public | Votes d'une participation |
| POST | `/toggle` | Membre | Voter / retirer son vote |
| DELETE | `/:id` | Admin | Supprimer un vote |

### Utilisateurs — `/api/users`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/` | Public | Liste tous les utilisateurs |
| GET | `/:id` | Public | Détail d'un utilisateur |
| GET | `/leaderboard` | Public | Classement des joueurs |
| POST | `/` | Membre | Créer un utilisateur |
| PATCH | `/:id` | Proprio/Admin | Modifier son profil |
| DELETE | `/:id` | Admin | Supprimer un utilisateur |

### Rôles — `/api/roles`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/` | Admin | Liste tous les rôles |
| GET | `/:id` | Admin | Détail d'un rôle |
| GET | `/:id/users` | Admin | Utilisateurs d'un rôle |

---
## Lancer le projet localement

Le projet est entièrement conteneurisé. Docker est requis.

```bash
# 1. Cloner le dépôt
git clone https://github.com/emmanueljoseph01/gamerchallenges.git
cd gamerchallenges

# 2. Configurer l'environnement
cp server/.env.example server/.env
# Puis créer un fichier .env à la racine (voir Variables d'environnement)

# 3. Lancer l'infrastructure
docker-compose up --build -d
```

L'application est ensuite accessible sur :
* **Frontend** → http://localhost:8080
* **API** → http://localhost:3000/api

### Peupler la base de données (optionnel)

```bash
# Entrer dans le container backend
docker exec -it gamer-api sh

# Créer les tables et insérer les données de test
npm run db:reset
```

Comptes disponibles après le seeding :

| Rôle | Email | Mot de passe |
|---|---|---|
| Admin | admin@gamer.com | adminSecureKey!2026 |
| Joueur | user0@gamer.com | playerGameZone!2026 |

---

## Variables d'environnement

Créer un fichier `.env` à la racine du projet (au même niveau que `docker-compose.yml`) :

```env
POSTGRES_USER=votre_user
POSTGRES_PASSWORD=votre_mot_de_passe
POSTGRES_DB=gamer_challenge
JWT_SECRET=votre_secret_jwt_long_et_complexe
JWT_EXPIRES_IN=24h
CLIENT_URL=http://localhost:8080
```

> En production, remplacer `CLIENT_URL` par l'URL de votre frontend déployé.

---

## Scripts disponibles

Depuis le dossier `server/` :

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur en mode développement (nodemon) |
| `npm run db:create` | Crée les tables en base |
| `npm run db:seed` | Insère les données de test |
| `npm run db:reset` | Recrée les tables + seed |

---

## Prochaines étapes (Roadmap technique)

Afin de consolider l'architecture actuelle et d'assurer la scalabilité de l'application, les prochaines évolutions techniques se concentreront sur les axes suivants :

* **Refonte de l'architecture Back-end :** Séparation des responsabilités via l'ajout de Services et de DTO
* **Optimisation des performances SQL** — pagination et index
* **Ajout de tests**
* **Passage à TypeScript**
* **Refonte du Front-end :** Migration vers React
