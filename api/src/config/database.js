//Arquivo responsável pelas 'connectionStrings da aplicação: PostgreSQL.

const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
//Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: 'postgres://postgres:Eduardinho0@localhost:5433/CRUD_NodeJs'
});

pool.on('error', (err, client) => {
  console.log('Erro inesperado', err)
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!')
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};