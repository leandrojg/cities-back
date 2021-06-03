const fetch = require("node-fetch");
const { Country, Activity } = require("../db.js");
//const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

// API
async function apiAllRequest(flag) {
  if (flag === true) {
    const request = await fetch(`https://restcountries.eu/rest/v2/all`);
    const countries = await request.json();
    if (countries !== undefined) {
      const countriesPromises = countries.map((e) => {
        return dbAllCreate(e).catch((error) => {
          //console.log("caught", error.message);
        });
      });
      await Promise.all(countriesPromises);
      flag = false;
      console.log("cambio a false la bandera");
      return flag;
    }
  }
}

// Database
function dbAllCreate(e) {
  try {
    return Country.create({
      idName: e.alpha3Code,
      name: e.name,
      continent: e.region,
      flagImg: e.flag,
      capital: e.capital,
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    });
  } catch (error) {
    console.log("caught", error.message);
  }
}

async function dbPagRequest(pag, tag, order, name = "") {
  const itemNumber = 10;
  name = name.toLowerCase();
  try {
    const countries = await Country.findAndCountAll({
      attributes: ["name", "flagImg", "continent", "idName", "area"],
      limit: itemNumber,
      offset: itemNumber * pag,
      order: [[tag, order]],
      where: {
        name: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("name")),
          "LIKE",
          "%" + name + "%"
        ),
      },
    });
    return countries;
  } catch (error) {
    console.log("caught", error.message);
  }
}

async function dbCallById(res, idName) {
  try {
    let country;
    country = await Country.findOne({
      where: {
        idName: idName,
      },
      include: Activity,
    });
    if (country === null) {
      console.log("País no encontrado!");
      return res.status(404).send("País no encontrado!");
    } else {
      console.log("Country: ", country);
      return res.send(country);
    }
  } catch (error) {
    return res.status(404).send("País no encontrado!");
  }
}

module.exports = {
  apiAllRequest,
  dbCallById,
  dbPagRequest,
};
