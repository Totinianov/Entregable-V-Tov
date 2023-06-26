const {
    getAll,
    create,
    getOne,
    remove,
    update,
} = require("../controllers/actor.controllers");
const express = require("express");

const routerActor = express.Router();

routerActor
    .route("/")
    .get(getAll) // Leer todos
    .post(create); // Crear

routerActor
    .route("/:id")
    .get(getOne) // Ler individual
    .delete(remove) // Borrar Individual
    .put(update); // Actualizar individual

module.exports = routerActor;
