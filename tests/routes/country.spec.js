const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  name: "Argentina",
  idName: "ARG",
  flagImg: "",
  continent: "Americas",
  capital: "Buenos Aires",
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() => Country.create(country))
  );
  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
  });
  describe("GET /countries Query", () => {
    it("should get 200", () => agent.get("/countries?name=ARG").expect(200));
    it("should get 200", () => agent.get("/countries?name=Arg").expect(200));
    it("should get 200", () => agent.get("/countries?name=arg").expect(200));
  });
});
