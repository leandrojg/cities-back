require("dotenv").config();

module.exports = {
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  appPort: process.env.APP_PORT || 3000,
  apiPort: process.env.API_PORT || 3001,
  Host: process.env.HOST,
};
