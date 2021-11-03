import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW5ndm82IiwiaWF0IjoxNjM1OTUyMTcyfQ.d2OFXpnjwcSnkFDv9ZuFiMXgpvIr2WZIbEHaKummVeU";

describe("Order Handler", () => {
  it("should return success for READ all products", async () => {
    const response = await request.get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ specific product", async () => {
    const response = await request.get("/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for CREATE product", async () => {
    const response = await request
      .post("/products")
      .auth(token, { type: "bearer" })
      .send({ name: "strawberry", price: 8 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE product", async (done) => {
    const response = await request
      .delete("/products")
      .auth(token, { type: "bearer" })
      .send({ id: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
