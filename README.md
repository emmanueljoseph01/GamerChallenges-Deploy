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

> Contexte : Ce projet a été réalisé dans le cadre d'un travail d'études en équipe. J'ai personnellement conçu et développé la majeure partie du back-end, de la modélisation de la base de données jusqu'à la sécurisation des routes et l'implémentation métier.

---

## Technologies utilisées

* **Back-end :** Node.js, Express
* **Base de données :** PostgreSQL, Sequelize
* **Front-end :** JavaScript, HTML5, CSS3
* **DevOps & Outils :** Git, GitHub, Docker

---

## Conception Back-end

Sécurité et Authentification :
* Hachage des mots de passe avec Argon2.
* Authentification stateless via JWT.
* Contrôle des accès avec des middlewares de vérification de rôles.

Robustesse et standardisation :
* Codes HTTP standardisés via la librairie `http-status-codes`.
* Gestion des erreurs centralisée dans un middleware global, gérer par des `next(error)`.
* Validation systématique des requêtes entrantes via un middleware dédié en amont des contrôleurs.

---

## Prochaines étapes (Roadmap technique)

Afin de consolider l'architecture actuelle et d'assurer la scalabilité de l'application, les prochaines évolutions techniques se concentreront sur les axes suivants :

* **Refonte de l'architecture Back-end :** Séparation des responsabilités via l'ajout de Services et de DTO.
* **Optimisation des performances SQL** 
* **Ajout de tests automatisés**  
* **Passage à TypeScript**  

---

## Lancer le projet localement

Le projet est entièrement conteneurisé. Docker est requis.

```bash
# 1. Cloner le dépôt
git clone [https://github.com/emmanueljoseph01/gamerchallenges.git](https://github.com/emmanueljoseph01/gamerchallenges.git)
cd gamerchallenges

# 2. Configurer l'environnement
cp server/.env.example server/.env

# 3. Lancer l'infrastructure
docker-compose up --build -d
