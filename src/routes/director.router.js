const {
    getAll,
    create,
    getOne,
    remove,
    update,
} = require("../controllers/director.controllers");
const express = require("express");

const routerDirector = express.Router();

routerDirector
    .route("/")
    .get(getAll) // Leer
    .post(create); // Crear

routerDirector
    .route("/:id")
    .get(getOne) // Leer Individual
    .delete(remove) // Borrar individual
    .put(update); // Actualizar individual

module.exports = routerDirector;
