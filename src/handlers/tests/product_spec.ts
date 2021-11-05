import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFudGRuMjM4LXVzZXItaGFuZGxlci10ZXN0IiwiaWF0IjoxNjM2MDgzNTYxfQ.TJlUQjkwOhLqHV7Olow-S5RP-d_ZO6-5o-U0cIBCbpU";

const productInstance = {
  name: "strawberry",
  price: 8,
};

describe("Product Handler", () => {
  it("should return success for CREATE product", async () => {
    const response = await request
      .post("/products")
      .auth(token, { type: "bearer" })
      .send(productInstance);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ all products", async () => {
    const response = await request.get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ product by product name", async () => {
    const response = await request
      .get("/products")
      .send(`productName=${productInstance.name}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE product by product id", async () => {
    const response = await request
      .delete("/products")
      .auth(token, { type: "bearer" })
      .send({ productName: productInstance.name });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
