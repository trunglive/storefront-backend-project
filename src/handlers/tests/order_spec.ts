import supertest from "supertest";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import app from "../../server";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";
import { OrderStore } from "../../models/order";

dotenv.config();

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, BCRYPT_TOKEN_SECRET } = process.env;

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFudGRuMjM4LXVzZXItaGFuZGxlci10ZXN0IiwiaWF0IjoxNjM2MDgzNTYxfQ.TJlUQjkwOhLqHV7Olow-S5RP-d_ZO6-5o-U0cIBCbpU";

const userInstance = {
  firstname: "Stephen",
  lastname: "Lynn",
  username: "stealksy-order-model-test",
};

const userInstancePassword = "GuoUo1ayD";

const productInstance = {
  name: "banana",
  price: 4,
};

describe("Order Handler", () => {
  beforeAll(async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };
    await userStore.create(user);

    await productStore.create(productInstance);
  });

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({ status: "ordered", userId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

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

  // it("should return success for CREATE order with product quantity and product id", async () => {
  //   const response = await request
  //     .post("/orders/products")
  //     .auth(token, { type: "bearer" })
  //     .send({ quantity: 2, orderId: 1, productId: 1 });
  //
  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeTruthy();
  // });

  afterAll(async () => {
    await productStore.delete(productInstance.name);
    await orderStore.delete("1");
    await userStore.delete(userInstance.username);
  });
});
