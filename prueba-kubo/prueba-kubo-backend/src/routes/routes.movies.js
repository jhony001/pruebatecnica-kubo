const router = require("express").Router();
const movieController = require("../controller/movies");

router.get("/movies", movieController.getMovies);

router.get("/movies/:category", movieController.getMoviesByCategory);

router.post("/movies/search", movieController.getMovieByTitle);

router.post("/movies/ratemovie", movieController.rateMovie);

router.post("/movies/checkasviewed", movieController.checkAsViewed);

router.post("/movies/checkasnotviewed", movieController.checkAsNotViewed);


module.exports = router;