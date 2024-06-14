const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const createConnection = require("./Database/Connection");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Load environment variables
if (process.env.NODE_ENV === 'docker') {
  dotenv.config({ path: './.env.docker' });
} else {
  dotenv.config();
}

const PORT = process.env.PORT || 4000;

let connection;

async function initializeConnection() {
  let check = true
  let count = 0
  try {
    connection = await createConnection();
    console.log('Database connection established successfully');

    // Pass the connection to the routes
    const routes = require("./Rounts/Rounts")(connection);
    app.use(routes);
    check = false
    http.createServer(app).listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    count++
    console.error('Failed to establish database connection:', error);
  } finally {
    if (check && count < 50){
      initializeConnection();
    }
    
  }
}

initializeConnection();
