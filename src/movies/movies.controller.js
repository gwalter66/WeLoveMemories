const service = require("./movies.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js")

async function list(req, res) {
    const isShowing = req.query.is_showing

    if(isShowing) {
        res.json({ data: await service.listIsShowing() })
    } else {
        res.json({ data: await service.list() })
    }
    
}

module.exports = {
    list: asyncErrorBoundary(list),
}