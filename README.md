# Projet Zombieland

C'est un projet qui vise à développer un site internet pour presenter les les différentes services d'un parc d'attraction, ce qui va permettre aux utilisateurs de découvrir les maneges, les spectacles, et les restaurants et les pour les gens qui veulent dormir sur place . La partie backend de ce projet utilise Node.js pour le serveur et PostgreSQL comme base de données. Nous avons mis en place une API pour gérer les opérations CRUD (Create, Read, Update, Delete) sur les données de site.

## Fonctionnalités

Accéder à la liste des maneges et les restaurants et les hotels disponible.
L'uthentification et la gestion des utilisateurs .

### Pré-requis

les technos qu'on va utiliser pour ce projet .

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)
- [bcrypt](https://www.bcrypt.fr/)
- [body-parser](https://www.npmjs.com/package/body-parser/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parserv/)
- [cors](https://www.npmjs.com/package/cors/)
- [doten](https://www.npmjs.com/package/dotenv/)
- [express-session](https://www.npmjs.com/package/express-session/)
- [pg-hstore](https://www.npmjs.com/package/pg-hstore/)
- [json](https://www.json.org/json-fr.html/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken/)
- [nodemailer](https://www.npmjs.com/package/nodemailer)

## Installation

1. Clonez le dépôt Git:

   ```bash
   git clone git@github.com:O-clock-Onigiri/projet-16-zombieland-back.git

   --> se mettre dans le dossiers de projet

   cd projet-16-zombieland-back.git

   ```

2. Installez les dépendances Node.js:

   ```bash

   npm install

   ```

3. La creation de la base de donnée:

========> pour la VM : <==================

```bash
1- se connecter a postgres :

sudo -i -u postgres

2- creation d'utilisateur :

CREATE USER zombi WITH PASSWAROD 'zombi';

3- creation de la base de donnée  :

CREATE DATABASE zombi OWNER zombi;

==> clique sur : \q : pour sortir de postgres

4- inserer les données dans la base de donnée

psql -U zombi -d zombi -f ./data/seeding.sql

```

========> pour windows : <==================

```bash

1- se connecter a postgres :

psql -U postgres

2- creation d'utilisateur :

CREATE USER zombi WITH PASSWAROD 'zombi';

3- creation de la base de donnée  :

CREATE DATABASE zombi OWNER zombi;

==> clique sur : \q : pour sortir de postgres

4- inserer les données dans la base de donnée

psql -U zombi -d zombi -f ./data/seeding.sql

```

3. Configurez les variables d'environnement:

   - Créez un fichier `.env` dans le même dossiers et configurer le avec les bonnes informations de connexion à votre base de données PostgreSQL:

   ```bash

   mv .env.example .env
   ```

   ```
   PORT=3000
   PG_URL=postgresql://zom:zombi@localhost:5432/zombi

   ```

## Démarrage

Pour démarrer le serveur http:

```bash

nodemon server.js

```

## Fabriqué avec

Voici les programmes/logiciels/ressources que nous avons utilisé pour développer notre projet :

- [Express](https://expressjs.com/)
- [PG](https://www.npmjs.com/package/pg)
- [Dot-env](https://www.npmjs.com/package/dotenv)
- [Vs-code](https://code.visualstudio.com/)
- [sequelize](https://sequelize.org/docs/v6/getting-started/)

## Auteurs

Liste des auteurs du projet:

- **O'clock** _alias_ [@Oclock](https://oclock.io/)
- **Hassane BEZZA** _alias_ [@HASSANEBEZZA](https://github.com/HASSANEBEZZA)
