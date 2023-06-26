const {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setActors,
    setDirectors,
} = require("../controllers/movie.controllers");
const express = require("express");

const routerMovie = express.Router();

routerMovie
    .route("/")
    .get(getAll) // Leer
    .post(create); // Crear

routerMovie
    .route("/:id")
    .get(getOne) // Leer
    .delete(remove) // Borrar
    .put(update); // Actualizar

// /movie/:id/genres
routerMovie.route("/:id/genres").post(setGenres); // Crear

// /movie/:id/actors
routerMovie.route("/:id/actors").post(setActors); // Crear

// /movie/:id/directors
routerMovie.route("/:id/directors").post(setDirectors); // Crear

module.exports = routerMovie;
