# Trainberry - Frontend

Ce dépôt contient l'interface graphique pour Trainberry.

# Démarrer le serveur

## Via Docker depuis DockerHub

1. Démarrez le container : `docker run -p 5173:5173 -e PUBLIC_SERVER_URL=<adresse_de_votre_serveur> --name trainberry_frontend a1hex/trainberry_frontend:<version>`
2. L'interface est désormais disponible sur `http://localhost:5173`. 🎉

## Via Docker depuis les sources (recommandé)

1. Clonez ce dépôt ;
2. Construisez l'image docker : `docker build -t trainberry_frontend:latest .`
3. Démarrez le container : `docker run -p 5173:5173 -e PUBLIC_SERVER_URL=<adresse_de_votre_serveur> --name trainberry_frontend a1hex/trainberry_frontend:latest`
4. Le serveur est désormais disponible sur `http://localhost:5173`. 🎉

## Depuis les sources

Pour démarrer ce serveur depuis les sources, vous devez disposer de NodeJS sur votre machine.

1. Installez les dépendances : `npm install`
2. Définissez la variable `PUBLIC_SERVER_URL` (exemple : `export PUBLIC_SERVER_URL=http://localhost:8080` si le serveur Trainberry est sur la même machine).
3. Démarrez le front : `npm run dev`

# Configuration

Aucune configuration n'est requise, hormis la variable `PUBLIC_SERVER_URL`.
