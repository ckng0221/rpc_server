const request = require("supertest");
const app = require("./app");

jest.mock("./rpc_client", () => {
  const originalModule = jest.requireActual("./rpc_client");

  return {
    __esModule: false,
    ...originalModule,
    callRPC: jest.fn(() => "True"),
  };
});

describe("Submit query", () => {
  test("Sucess response", () => {
    return request(app).post("/").send({ body: "Trial" }).expect(200);
  });

  test("Valid result", () => {
    return request(app)
      .post("/")
      .send({ body: "Trial" })
      .then((res) => {
        const results = ["True", "False"];
        console.log(res.text);
        expect(results.includes(res.text)).toBeTruthy();
      });
  });
});
