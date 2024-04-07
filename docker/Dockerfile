FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install sequelize pg pg-hstore
RUN npm install
RUN npm install -g ts-node typescript
RUN npm install --save-dev @types/express
RUN npm install pg --save

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
