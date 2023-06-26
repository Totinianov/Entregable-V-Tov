const supertest = require("supertest");
const app = require("../app");
require("../models");

const URL_BASE = "/api/v1/actors";
let actorId;

test("POST -> 'URL', should return status code 201 and res.body.name === body.name ", async () => {
    const actor = {
        firstName: "Henry",
        lastName: "Nunura",
        nationality: "Costa Rica",
        image: "001.png",
        birthday: "1980-06-15",
    };

    const res = await supertest(app)
        .post(URL_BASE) // crear
        .send(actor); // enviar

    actorId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(actor.name);
});

test("GET 'URL', should return status code 200 and res.body.length ==== 1", async () => {
    const res = await supertest(app).get(URL_BASE);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].lastName).toBeDefined();
});

test("PUT 'URL', should return status code 200 and res.body.lastName ==== body.lastName", async () => {
    const actor = {
        lastName: "Yatra Modif",
    };

    const res = await supertest(app)
        .put(`${URL_BASE}/${actorId}`) // 1
        .send(actor); // 1

    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(actor.lastName);
});

test("DELETE 'URL', should return status code 204", async () => {
    const res = await supertest(app).delete(`${URL_BASE}/${actorId}`);

    expect(res.status).toBe(204);
});
