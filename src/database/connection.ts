import { Sequelize, Dialect } from 'sequelize';

const dbPort = Number(process.env.DB_PORT) || 5432;
const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASS || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_DATABASE || 'server';
const dbType: Dialect = (process.env.DB_TYPE as Dialect) || 'postgres';
const consoleLogs = process.env.DB_CONSOLE_LOG === 'true';

export const db = new Sequelize(
  dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbType,
    port: dbPort,
    logging: consoleLogs,
  },
);

export async function init() {
  try {
    await db.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:');
    console.error(error)
  }
}

process.on('SIGTERM', () => {
  db.close().then(() => {
    console.log('Conexão com o banco de dados fechada.');
    process.exit(0);
  });
});
