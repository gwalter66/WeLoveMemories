const router = require("express").Router()
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed.js")

router
    .route("/:reviewId")
    .delete(controller.delete)
    .all(methodNotAllowed)

module.exports = router