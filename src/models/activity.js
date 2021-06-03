const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("activity", {
    activityName: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.ENUM("baja", "media", "alta"),
    },
    duration: {
      type: DataTypes.TIME,
    },
    season: {
      type: DataTypes.ENUM("verano", "otonio", "invierno", "primavera"),
    },
  });
};
