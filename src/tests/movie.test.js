const request = require("supertest");
const app = require("../app");
require("../models");

const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const URL_BASE = "/api/v1/movies";
let movieId;

test("POST -> '/api/v1/movies', should return status code 201 and res.body.name = movie.name", async () => {
    const movie = {
        name: "Harry Potter y la Pierdra filosofal",
        image: "lorm10",
        synopsis: "lorem20",
        releaseYear: 2012,
    };

    const res = await request(app)
        .post(URL_BASE) // crear
        .send(movie); // enviar

    movieId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
});

test("GET 'URL', should return status code 200 and res.body.length ==== 1", async () => {
    const res = await request(app).get(URL_BASE);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBeDefined();
});

test("PUT 'URL', should return status code 200 and res.body.name ==== body.name", async () => {
    const movie = {
        name: "Harry Potter y la Pierdra filosofal",
    };

    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`) // 1
        .send(movie); // 1

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test("DELETE 'URL', should return status code 204", async () => {
    const res = await request(app).delete(`${URL_BASE}/${movieId}`);

    expect(res.status).toBe(204);
});

/* Tabla pivot Relaciones "MoviesActors": movies y actors  */
test("POST -> '/api/v1/movies/:id/actors', should return status code 201 and res.body.name === body.name", async () => {
    const actorBody = {
        firstName: "Harry",
        lastName: "Potter",
        nationality: "Inglaterra",
        image: "lorem10",
        birthday: "1980-10-15",
    };

    const actor = await Actor.create(actorBody);

    const movieBody = {
        name: "Jarry Potter y la Piedra Filosofal",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 2012,
    };

    const movie = await Movie.create(movieBody);

    const moviesActors = {
        actorId: `${actor.id}`,
        movieId: `${movie.id}`,
    };

    const res = await request(app)
        .post(`${URL_BASE}/${movie.id}/actors`) // Ruta
        .send(moviesActors); // Enviar

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(songBody.id);

    await actor.destroy();
    await movie.destroy();
});

/* Tabla pivot Relaciones "MoviesDirectors": movies y directors  
test("POST -> 'URL', should return status code 201 and res.body.name === body.name", async () => {
    const genresBody = {
        firstName: "Chris",
        lastName: "Columbus",
        nationality: "Inglaterra",
        image: "lorem10",
        birthday: "1958-09-10",
    };

    const director = await Director.create(genresBody);

    const movieBody = {
        name: "Jarry Potter y la Piedra Filosofal",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 2012,
    };

    const movie = await Movie.create(movieBody);

    const moviesDirectors = {
        movieId: `${movie.id}`,
        directorId: `${director.id}`,
    };

    const res = await request(app)
        .post("/api/v1/MoviesDirectors") // Ruta
        .send(moviesDirectors); // Enviar

    //    expect(res.status).toBe(201);
    //    expect(res.body.name).toBe(songBody.name);

    await director.destroy();
    await movie.destroy();
});

/* Tabla pivot Relaciones "MoviesGenres": movies y genres 
test("POST -> 'URL', should return status code 201 and res.body.name === body.name", async () => {
    const genresBody = {
        name: "Ciencia ficcion",
    };

    const genre = await Genre.create(genresBody);

    const movieBody = {
        name: "Jarry Potter y la Piedra Filosofal",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 2012,
    };

    const movie = await Movie.create(movieBody);

    const moviesGenres = {
        movieId: `${movie.id}`,
        genreId: `${genre.id}`,
    };

    const res = await request(app)
        .post("/api/v1/MoviesGenres") // Ruta
        .send(moviesGenres); // Enviar

    //    expect(res.status).toBe(201);
    //    expect(res.body.name).toBe(songBody.name);

    await genre.destroy();
    await movie.destroy();
});

*/
