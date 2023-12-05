# Jaron-Maximilian
Project Advanced Full Stack Developement.

## Enviroments
### Pwa
- VITE_apiKey
- VITE_authDomain
- VITE_projectId
- VITE_storageBucket
- VITE_messagingSenderId
- VITE_appId

These enviroments are from your firebase app.

### API
#### .env
- GOOGLE_APPLICATION_CREDENTIALS (path to the credentials.json file)
- DB_HOST
- DB_PORT (external port)
- DB_NAME
- NODE_ENV
- FRONTEND_URL

#### .env.production
- GOOGLE_APPLICATION_CREDENTIALS (path to the credentials.json file)
- CLI_PATH
- DB_HOST
- DB_PORT   (internal port)
- DB_NAME
- NODE_ENV
- FRONTEND_URL

#### credentials.json

This file is made in the process of getting the locales and translations.

## Startup Command
### Pwa
npm run dev:pwa


### Api
npm run dev:api

### i18n-export
npm run export:translations

## Setup Translations
- Use Firebase for authentication
- For the package i18n:
    - Google credentials: Create Oauth client id > choose for: Desktop App. When created safe the credentials.json in "packages/i18n-export/src"
        - Run "npm run export" in the i18n-export folder or "npm run export:translations" in the repo folder
