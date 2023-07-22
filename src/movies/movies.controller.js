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

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)

    if(movie) {
        res.locals.movie = movie
        return next()
    } else {
        next({
            status: 404,
            message: "Movie cannot be found"
        })
    }
}


function read(req, res) {
    res.json({ data: res.locals.movie })
}

async function readMoviesTheaters(req, res) {
    res.json({ data: await service.readMoviesTheaters()})
}

async function listMovieReviews(req, res) {
    
    res.json({ data: await service.listMovieReviews(res.locals.movie.movie_id)})
}

module.exports = {
    list: asyncErrorBoundary(list),

    read: [
        asyncErrorBoundary(movieExists),
        read
    ],

    readMoviesTheaters: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(readMoviesTheaters)
    ],

    listMovieReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listMovieReviews)
    ]
}