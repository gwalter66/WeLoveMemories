This is a backend project made for Thinkful module 43 We Love Memories

To run server locally"
    fork and clone this repository
    run "npm install"
    run "npm start" --this will deploy the server using PORT: 5001


For a deployed version of the server visit:
    https://welovememories-backend.onrender.com/

There is not route for ("/") so the home route will show:
    {"error":"Not Found: /"}

The following routes are available for "get" requests:
    ("/movies")
    ("/movies?is_showing=true")
    ("/movies/:movieId")
    ("/movies/movieId/theaters")
    ("/movies/movieId/reviews")
    ("/theaters)

The following routes are available for "put" requests:
    ("/reviews/:reviewId")

The following routes are available for "delete" requests:
    ("/reviews/:reviewId")