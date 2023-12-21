# Jaron-Maximilian
Project Advanced Full Stack Developement.

Make sure to have the node version that is shown in the .nvmrc file or higher (https://nodejs.org)

This project makes use of a docker compose file. For this you will need Docker Desktop on your computer (https://www.docker.com/products/docker-desktop/).

To access the data this project you will need MongoDBCompass (https://www.mongodb.com/try/download/compass).

Link to a video example: https://youtu.be/1ec2LDcLbk4

## Statup Command (for the whole project)

    rootfolder: npm run dev

If you haven't followed the steps below this will probably not work.

## API

Make an .env file in the api folder.

Enviroment values:

- DB_HOST (the host of your database)
- DB_PORT (the port of your database)
- DB_Name  (the name of your database)
- NODE_ENV  (type either 'production' or 'development')
- FRONTEND_URL (the url of your frontend)
- GOOGLE_APPLICATION_CREDENTIALS (path to the credentails.json -> this file will be created in the translations part of this project)

The google credentials are not needed to run this project. These are used to add/change translations.

Run commands:

    rootfolder: npm run dev:api
    api-folder: npm run dev

# Seeding command:

-   setup commands:
        
        rootfolder: npm run seed:setup
        api-folder: npm run seed:setup
-   reset commands:

        rootfolder: npm run seed:reset
        api-folder: npm run seed:reset
-   seeding commands:

        rootfolder: npm run seed:all
        api-folder: npm run seed:all

## Translations (i18n)

The translations of this project where saved in a google spreadsheet. To make use of your own follow these steps.

- Google Credentials:

    - Log in on your google cloud profile
    - Create an Oauth client id (make it a Desktop App), download the credentials.json file of that user
      in "packages/i18n-export/src"
    
- Google spreadsheet:
    
    Make your own spreadsheet. For each language you want to add make a page. Each page will have the following schematic:
    - Column A (Key): Will have the key you have to provide for the i18n package.
    - Column B (Default): The default text.
    - Column C ('locale'): The text of the language you want to add in this page. The title of this column is the official locale of that language.

Run commands: 

    rootfolder: npm run export:translations
    i18n-export folder: npm run export

When you plan on using your own translation there is a possibility that when you get your transaltions for a second time you could get an error. This means that the token of your google account in i18n-export is not usable anymore. Delete it and you will be able to fetch your translations again.

## PWA

To make use of the login system of this project will have to make a Firebase project.

Go to firebase.google.com . Login and make a new project (Web app). Go to your project settings and look for your app. There you will find your firebaseConfig object. These values will be put in enviroments.

Make an .env file in the pwa folder.

Enviroment values:

- VITE_apiKey
- VITE_authDomain
- VITE_projectId
- VITE_storageBucket
- VITE_messagingSenderId
- VITE_appId

Run commands:

    rootfolder: npm run dev:pwa
    pwa-folder: npm run dev
