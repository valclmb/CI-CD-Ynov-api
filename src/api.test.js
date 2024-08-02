const request = require("supertest");
const mockingoose = require("mockingoose");
const model = require("../model/user");
const app = require("../router");

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
    const _doc = [];

    mockingoose(model).toReturn(_doc, "find");

    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ users: [], success: true });
  });

  test("responds with error", async () => {
    mockingoose(model).toReturn(new Error("Error"), "find");

    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Error fetching users: Error",
      success: false,
    });
  });
});

const _validDoc = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com",
  birthDate: "1990-01-01",
  city: "Paris",
  zipCode: "75000",
};

describe("POST /users", () => {
  test("responds with json", async () => {
    mockingoose(model).toReturn(_validDoc, "save");

    const response = await request(app)
      .post("/users")
      .send(_validDoc)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User created", success: true });
  });

  test("responds with error because invalid object", async () => {
    const _doc = {
      _id: "60d0fe4f531123616c7f2b2c",
      firstName: "John",
      lastName: "Doe",
    };

    mockingoose(model).toReturn(_doc, "save");

    const response = await request(app)
      .post("/users")
      .send(_doc)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Please provide all required fields",
      success: false,
    });
  });

  test("responds with error", async () => {
    mockingoose(model).toReturn(new Error("Error"), "save");

    const response = await request(app)
      .post("/users")
      .send(_validDoc)
      .set("Accept", "application/json");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Error",
      success: false,
    });
  });
});
