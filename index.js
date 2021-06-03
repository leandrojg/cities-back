const env = require("./src/utils/enviroment.js");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

//Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(env.apiPort, () => {
    console.log(`%s listening at ${env.apiPort}`); // eslint-disable-line no-console
  });
});
