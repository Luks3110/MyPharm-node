const request = require("supertest");
const app = require("../../app");
const mongoDB = require("../../database/dbConnect")

describe("Test the /produtos path", () => {
    beforeAll(async () => {
        await mongoDB.getConnection();
    });
    afterAll(async () => {
        await mongoDB.disconnect();
    });

  it("GET /produtos should return a list of produtos", () => {
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
                    categories: expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(String),
                            name: expect.any(String),
                            description: expect.any(String),
                            __v: expect.any(Number)
                        }),
                    ]),
                    brand: expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(String),
                            name: expect.any(String),
                            __v: expect.any(Number)
                        }),
                    ]),
                })
            ])
        )
      });
  });
});