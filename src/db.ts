import { Sequelize } from 'sequelize';

const isRunningInDocker = process.env.RUNNING_IN_DOCKER === 'true';

const connectionString = isRunningInDocker
    ? 'postgres://admin:[REMOVED]@expo-app-db:5432/faladoc'
    : 'postgres://admin:[REMOVED]@ec2-3-22-75-73.us-east-2.compute.amazonaws.com:5432/faladoc.dev';

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    quoteIdentifiers: true
});

export default sequelize;
