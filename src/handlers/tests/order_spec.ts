import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW5ndm82IiwiaWF0IjoxNjM1OTUyMTcyfQ.d2OFXpnjwcSnkFDv9ZuFiMXgpvIr2WZIbEHaKummVeU";

describe("Order Handler", () => {
  it("should return success for READ all orders", async () => {
    const response = await request.get("/orders");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ orders by user id", async () => {
    const response = await request.get("/orders").send("userId=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({ status: "ordered", userId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for CREATE order with product quantity and product id", async (done) => {
    const response = await request
      .post("/orders/products")
      .auth(token, { type: "bearer" })
      .send({ quantity: 2, orderId: 1, productId: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
