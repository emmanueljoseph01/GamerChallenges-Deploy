# client/Dockerfile
FROM nginx:alpine

# vide le dossier par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# On copie tout les fichiers coté client
COPY . /usr/share/nginx/html

# Nginx écoute sur le port 80
EXPOSE 80

# Lance Nginx
CMD ["nginx", "-g", "daemon off;"]