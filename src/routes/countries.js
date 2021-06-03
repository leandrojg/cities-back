const express = require("express");
const router = express.Router();
const { getAllCountries, getCountryId } = require("../controllers/countries");

router.get("/", getAllCountries);
router.get("/:idName", getCountryId);

module.exports = router;
