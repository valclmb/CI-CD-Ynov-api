const { postUsers } = require("../../src/api");

describe("GET /users", () => {
  it("gets a list of users", () => {
    cy.request("GET", "/users").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.users.length).to.eq(2);
    });
  });
});

describe("POST /users", () => {
  it("creates a new user", () => {
    cy.request("POST", "/users", {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@email.fr",
      birthDate: "1990-01-01",
      city: "Paris",
      zipCode: "75000",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("User created");
    });

    cy.request("GET", "/users").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.users.length).to.eq(3);
    });
  });
});
