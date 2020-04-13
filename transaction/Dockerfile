FROM node:8.11.4

ARG NPM_TOKEN

WORKDIR /transaction
COPY ./package*.json ./

# Install
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
