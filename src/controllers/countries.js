const { apiAllRequest, dbCallById, dbPagRequest } = require("./calls");

let flagApiCall = true; //bandera para hacer un pedido de todos los countries.

async function getAllCountries(req, res) {
  // Constantes
  const PAG = req.query.pag || "0";
  const TAG = req.query.tag || "idName";
  const ORDER = req.query.order || "ASC";
  const NAME = req.query.name;
  try {
    flagApiCall = await apiAllRequest(flagApiCall);

    const countries = await dbPagRequest(PAG, TAG, ORDER, NAME);

    if (countries.count === 0) {
      return res.status(404).send("País no encontrado");
    }
    const pages = Math.ceil(countries.count / 10);
    return res.status(200).send({ countries: countries.rows, pages });
  } catch (error) {
    console.log("caught", error.message);
  }
}

async function getCountryId(req, res) {
  const { idName } = req.params;

  await dbCallById(res, idName);
}

module.exports = {
  getAllCountries,
  getCountryId,
};
