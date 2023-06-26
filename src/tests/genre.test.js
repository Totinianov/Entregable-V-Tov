const supertest = require("supertest");
const app = require("../app");
require("../models");

const URL_BASE = "/api/v1/genres";
let genreId;

test("POST -> '/api/v1/genres', should return status code 201 and res.body name = genre.name ", async () => {
    const genre = {
        name: "Accion",
    };

    const res = await supertest(app)
        .post(URL_BASE) // 1
        .send(genre); // enviamos

    genreId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(genre.name);
});

test("GET -> 'URL' should return status code 200 and res.body.length === 1 ", async () => {
    const res = await supertest(app).get(URL_BASE);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT -> ''url/:id', should retrun 200 and res.body.name === genre.name", async () => {
    const genre = {
        name: "Accion",
    };

    const res = await supertest(app)
        .put(`${URL_BASE}/${genreId}`) // cn
        .send(genre); // enviar

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test("DELETE -> 'url/:id', should return status code 204", async () => {
    const res = await supertest(app).delete(`${URL_BASE}/${genreId}`);

    expect(res.status).toBe(204);
});
