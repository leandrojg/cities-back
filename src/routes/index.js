//const { Router } = require('express');
//const router = Router();

var express = require("express");
var router = express.Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countriesRoute = require("./countries");
const activityRoute = require("./activity");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countriesRoute);
router.use("/activity", activityRoute);

//router.use(express.json());

//Get a home
router.get("/", (req, res) => {
  return res.status(200).send("hola mundito, soy le home");
});

module.exports = router;
