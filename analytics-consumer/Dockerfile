FROM node:8.11.4

ARG NPM_TOKEN

WORKDIR /analytics-consumer
COPY ./package*.json ./

# Install
RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
