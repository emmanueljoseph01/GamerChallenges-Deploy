# server/Dockerfile
FROM node:20-alpine

WORKDIR /app

# copie les fichiers config
COPY package*.json ./

# Installation  des dépendances
RUN npm ci --only=production

# copie le code source
COPY . .

# Port Backend
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]