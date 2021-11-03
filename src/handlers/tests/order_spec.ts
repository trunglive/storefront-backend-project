import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Order Handler", () => {
  it("should return success for READ all orders", async (done) => {
    const response = await request.get("/orders");

    expect(response.status).toBe(200);

    done();
  });

  it("should return success for READ orders by user id", async (done) => {
    const response = await request.get("/orders/1");

    expect(response.status).toBe(200);

    done();
  });

  it("should return success for CREATE order", async (done) => {
    const response = await request
      .post("/orders")
      .send({ status: "ordered", userId: 1 });

    expect(response.status).toBe(200);

    done();
  });

  it("should return success for CREATE order with product quantity and product id", async (done) => {
    const response = await request.post("/orders/products");

    expect(response.status).toBe(200);

    done();
  });
});
