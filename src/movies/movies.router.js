const router = require("express").Router()
const controller = require("./movies.controller.js")
const methodNotAllowed = require("../errors/methodNotAllowed.js")

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router