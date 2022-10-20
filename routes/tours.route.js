const express = require("express");
const router = express.Router();
const tourRouter = require("../controller/tour.controller");

router.route("/")
    .get(tourRouter.getTours)
    .post(tourRouter.saveATour)


router.route("/trending")
    .get(tourRouter.getTrending)

router.route("/cheapest")
    .get(tourRouter.getCheapest)

router.route("/:id")
    .get(tourRouter.getTourById)
    .patch(tourRouter.updateTourById)

module.exports = router;