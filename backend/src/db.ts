import { Sequelize } from 'sequelize';

const isRunningInDocker = process.env.RUNNING_IN_DOCKER === 'true';

const connectionString = isRunningInDocker
  ? 'postgres://ademir:[REMOVED]@db:5432/faladoc'
  : 'postgres://ademir:[REMOVED]@localhost:5432/faladoc';

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  quoteIdentifiers: true,
});

export default sequelize;
