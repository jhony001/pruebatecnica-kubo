const Database = require("../utils/database");

const getMovies = (req, res) => {
    let sqlQuery = "SELECT * FROM movies";
    Database.executeQuery(req, res, sqlQuery);
}

const getMoviesByCategory = (req, res) => {
    let sqlQuery = `SELECT * FROM categories_movies
        inner join movies on movies.id = categories_movies.id_movie
        inner join categories on categories.id = categories_movies.id_category
        where category_name = "${req.params.category}"
    `;
    Database.executeQuery(req, res, sqlQuery)
}

const getMovieByTitle = (req, res) => {
    let sqlQuery = `SELECT * FROM movies where title="${req.body.title}"`
    Database.executeQuery(req, res, sqlQuery);
}

const rateMovie = (req, res) => {
    let sqlQuery = `UPDATE movies SET calificacion=${req.body.calificacion} WHERE id="${req.body.id}"`;
    Database.executeQuery(req, res, sqlQuery);
}

const checkAsViewed = (req, res) => {
    let sqlQuery = `UPDATE movies SET vista=1 WHERE id="${req.body.id}"`;
    Database.executeQuery(req, res, sqlQuery);
}

const checkAsNotViewed = (req, res) => {
    let sqlQuery = `UPDATE movies SET vista=0 WHERE id="${req.body.id}"`;
    Database.executeQuery(req, res, sqlQuery);
}

module.exports = {
    getMovies,
    getMoviesByCategory,
    getMovieByTitle,
    rateMovie,
    checkAsViewed,
    checkAsNotViewed
}