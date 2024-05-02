# Repositório Backend - Projeto Faladoc

## Requisitos

Para o funcionamendo do projeto é necessário ter o node em sua versão 20.11.1 instalado na maquina local juntamente do docker

## Rodando o APP com o docker

Para rodar o app localmente execute os comandos abaixo:

```
cd .\docker\
docker compose up
```

## Rodando o APP sem o docker

O banco de dados local obrigatoriamente só roda com o Docker. Se alguém quiser ter uma cópia do banco localmente sem o docjer, isso não foi feito ainda, não é recomendado, e é por conta própria.

Mas caso alguém queira rodar o express local e o banco dockerizado(por algum motivo), Segue os passos abaixos (node 20.11.1 obrigatório novamente)

```
npm install
npm install sequelize pg pg-hstore
npm install -g ts-node typescript
npm install --save-dev @types/express
npm install pg --save
npm install --save-dev @types/cors
npm install bcrypt
npm install --save-dev @types/bcrypt
```