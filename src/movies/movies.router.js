const router = require("express").Router()
const controller = require("./movies.controller.js")
const methodNotAllowed = require("../errors/methodNotAllowed.js")

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

router
    .route("/:movieId/theaters")
    .get(controller.readMoviesTheaters)
    .all(methodNotAllowed)

router
    .route("/:movieId/reviews")
    .get(controller.listMovieReviews)
    .all(methodNotAllowed)

module.exports = router