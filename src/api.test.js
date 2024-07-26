const request = require("supertest");
const mockingoose = require("mockingoose");
const model = require("../model/user");
import { app } from "../router";

describe("GET /users", () => {
  test("responds with json", async () => {
    const _doc = [
      {
        _id: "60d0fe4f531123616c7f2b2c",
        firstName: "John",
        email: "johndoe@email.com",
      },
    ];

    mockingoose(model).toReturn(_doc, "find");

    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ users: _doc, success: true });
  });

  test("responds with empty array", async () => {
    const _doc: unknown = [];

    mockingoose(model).toReturn(_doc, "find");

    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ users: [], success: true });
  });
});

describe("POST /users", () => {
  test("responds with json", async () => {
    const _doc = {
      _id: "60d0fe4f531123616c7f2b2c",
      firstName: "John",
      email: "johndoe@email.com",
    };

    mockingoose(model).toReturn(_doc, "save");

    const response = await request(app)
      .post("/users")
      .send(_doc)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
  });
});
