const { Activity, Country } = require("../db.js");
const { Op } = require("sequelize");

async function getActivities(req, res) {
  if (req.query.name) {
    const name = req.query.name;
    try {
      const activity = await Activity.findOne({
        where: {
          activityName: name,
        },
        include: Country,
      });
      if (activity === null) {
        console.log("Actividad no encontrada!");
        return res.status(404).send("Actividad no encontrada!");
      } else {
        console.log("activity: ", activity.countries);
        return res.send(activity.countries);
      }
    } catch (error) {
      return res.status(404).send("Actividad no encontrada!");
    }
  } else {
    try {
      const activities = await Activity.findAll();
      console.log(activities);
      return res.send(activities);
    } catch (error) {
      return res.status(404).send("Actividad no encontrada!");
    }
  }
}
async function postActivities(req, res) {
  console.log("req: ", req.body);
  const e = req.body;
  try {
    const activitiesCreate = await Activity.create({
      activityName: e.name,
      difficulty: e.difficulty,
      duration: e.duration,
      season: e.season,
    });
    const includedCountries = await Country.findAll({
      where: {
        name: {
          [Op.in]: e.countriesAct,
        },
      },
    });
    await activitiesCreate.setCountries(includedCountries);
  } catch (error) {
    console.log("caught", error.message);
  }
  return res.status(200).send(req.body);
}

module.exports = {
  postActivities,
  getActivities,
};
