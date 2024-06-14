const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
if (process.env.NODE_ENV === 'docker') {
  dotenv.config({ path: './.env.docker' });
} else {
  dotenv.config();
}

async function createConnection() {
  let tryConnect = 10
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'test-app-db'
    });
    console.log(process.env.DB_HOST);
    return connection;
  } catch (error) {
    console.log(process.env.DB_HOST);
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = createConnection;
