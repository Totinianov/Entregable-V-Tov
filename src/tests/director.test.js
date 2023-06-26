const supertest = require("supertest");
const app = require("../app");
require("../models");

const URL_BASE = "/api/v1/directors";
let directorId;

test("POST -> 'URL', should return status code 201 and res.body.firstName === body.firstName ", async () => {
    const director = {
        firstName: "Douglas",
        lastName: "Michael",
        nationality: "USA",
        image: "http://gis/001.png",
        birthday: "1985-10-25",
    };

    const res = await supertest(app)
        .post(URL_BASE) // crear
        .send(director); // enviar

    directorId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName);
});

test("GET 'URL', should return status code 200 and res.body.length ==== 1", async () => {
    const res = await supertest(app).get(URL_BASE);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].lastName).toBeDefined();
});

test("PUT 'URL', should return status code 200 and res.body.lastName ==== body.lastName", async () => {
    const director = {
        lastName: "Gouglas Modif",
    };

    const res = await supertest(app)
        .put(`${URL_BASE}/${directorId}`) // 1
        .send(director); // 1

    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(director.lastName);
});

test("DELETE 'URL', should return status code 204", async () => {
    const res = await supertest(app).delete(`${URL_BASE}/${directorId}`);

    expect(res.status).toBe(204);
});
