###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18 as development

WORKDIR /usr/src/app

#copy from the root folder
COPY --chown=node:node package*.json ./
COPY --chown=node:node packages/api/package*.json ./packages/api/

RUN npm ci

COPY --chown=node:node packages/api ./packages/api 

USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access the node_modules from the last step
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node packages/api packages/api

RUN npm run build -w api

ENV NODE_ENV production
# Make new node_modules folder with only production dependencies
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/packages/api/dist ./packages/api/dist

CMD [ "node", "packages/api/dist/main.js" ]