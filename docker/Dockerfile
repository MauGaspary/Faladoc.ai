FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && \
    npm install sequelize pg pg-hstore ts-node typescript cors && \
    npm install --save-dev @types/node @types/express @types/cors @types/bcrypt

COPY . .

RUN printenv  

EXPOSE 3000

CMD ["npx", "ts-node", "src/app.ts"]
