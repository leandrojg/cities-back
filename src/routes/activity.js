const express = require("express");
const router = express.Router();
const { getActivities, postActivities } = require("../controllers/activity");

router.get("/", getActivities);
router.post("/", postActivities);

module.exports = router;
