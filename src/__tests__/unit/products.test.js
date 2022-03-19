const request = require("supertest");
const app = require("../../app");
const mongoDB = require("../../database/dbConnect")

describe("Test the /produtos path", () => {
    beforeAll(async () => {
        await mongoDB.getConnection();
        request(app)
            .post("/usuarios/auth/login")
            .send({
                email: "lucas5@teste.com",
                password: "teste"
            })
    });
    afterAll(async () => {
        await mongoDB.disconnect();
        request(app)
            .post("/usuarios/auth/logout")
    });
    describe("GET Requests", () => {
        it("/ should return a list of produtos", () => {
            return request(app)
                .get("/produtos")
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty("produtos")
                    expect(response.body.produtos)
                        .toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({
                                    _id: expect.any(String),
                                    name: expect.any(String),
                                    description: expect.any(String),
                                    price: expect.any(Number),
                                    stock: expect.any(Number),
                                    categories: expect.objectContaining({
                                        _id: expect.any(String),
                                        name: expect.any(String),
                                        description: expect.any(String),
                                        __v: expect.any(Number)
                                    }),
                                    brand: expect.objectContaining({
                                        _id: expect.any(String),
                                        name: expect.any(String),
                                        __v: expect.any(Number)
                                    }),
                                })
                            ])
                        )
                });
        });
        it("/:id should return a single produto", () => {
            return request(app)
                .get("/produtos/6233a2b9bfb4ce6f1fb98d42")
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty("produto")
                    expect(response.body.produto)
                        .toEqual(
                            expect.objectContaining({
                                _id: expect.any(String),
                                name: expect.any(String),
                                description: expect.any(String),
                                price: expect.any(Number),
                                stock: expect.any(Number),
                                categories: expect.objectContaining({
                                    _id: expect.any(String),
                                    name: expect.any(String),
                                    description: expect.any(String),
                                    __v: expect.any(Number)
                                }),
                                brand: expect.objectContaining({
                                    _id: expect.any(String),
                                    name: expect.any(String),
                                    __v: expect.any(Number)
                                }),
                            })
                        )
                });
        })
    })
    describe("POST Requests", () => {
        it("POST /produtos should return a sucess message and show the added product", () => {
            return request(app)
                .post("/produtos")
                .send({
                    name: "PRODUCT360",
                    description: "Test",
                    price: 1,
                    stock: 1,
                    categories: "5e9c7e8e9c9d440000f0e0a0",
                    brand: "623232c9f17de64141fca0c4"
                })
                .expect('Content-Type', /json/)
                .expect(201)
        })
    })
    describe("PATCH Request", () => {
        it("PATCH /produtos should return the updated produto", () => {
            return request(app)
                .patch("/produtos/6233a2b9bfb4ce6f1fb98d42")
                .send({
                    name: "ProductPatched1",
                    description: "patched1",
                    price: 3,
                    stock: 4,
                    categories: "622fe0a80e8ec81c7a31bbcd",
                    brand: "622f55602852f4e76ed25bd0",
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.produto)
                        .toEqual({
                            name: expect.any(String),
                            description: expect.any(String),
                            price: expect.any(Number),
                            stock: expect.any(Number),
                            categories: expect.any(String),
                            brand: expect.any(String),
                            _id: expect.any(String),
                            __v: expect.any(Number)
                        })
                })
        })
    })
    describe("DELETE request", () => {
        it("DELETE /produtos/:id should delete the product that has the ID passed on the param", () => {
            return request(app)
                .delete('/produtos/623232e9667e021b83fedf30')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body)
                        .toEqual({
                            message: "Produto deletado com sucesso!"
                        })
                })
        })
    })
})