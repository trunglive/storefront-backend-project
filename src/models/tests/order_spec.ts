import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { OrderStore } from "../order";
import { User, UserStore } from "../user";
import { Product, ProductStore } from "../product";

dotenv.config();

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, BCRYPT_TOKEN_SECRET } = process.env;

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const userInstance = {
  firstname: "Jennifer",
  lastname: "Kim",
  username: "jesoik-order-model-test",
};

const userInstancePassword = "Aoe1y381o";

const productInstance = {
  name: "banana",
  price: 4,
};

describe("Order Model", () => {
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

  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("CREATE method should add an order", async () => {
    // @ts-ignore
    const { status, user_id } = await store.create({
      status: "shipped", // ordered - shipped - delivered
      userId: 3,
    });

    expect({ status, user_id }).toEqual({
      status: "shipped",
      user_id: "3",
    });
  });

  it("INDEX method should return a list of all orders", async () => {
    // @ts-ignore
    const [{ status, user_id }] = await store.index();

    expect({ status, user_id }).toEqual({
      status: "shipped",
      user_id: "3",
    });
  });

  it("SHOW method should return the orders of a user", async () => {
    // @ts-ignore
    const { status, user_id } = await store.show("3");

    expect({ status, user_id }).toEqual({
      status: "shipped",
      user_id: "3",
    });
  });

  // it("add product method should add an order with product quantity and product id", async () => {
  //   // @ts-ignore
  //   const { quantity, order_id, product_id } = await store.addProduct({
  //     quantity: 4,
  //     orderId: 1,
  //     productId: 1,
  //   });
  //
  //   expect({ quantity, order_id, product_id }).toEqual({
  //     quantity: 4,
  //     order_id: "1",
  //     product_id: "1",
  //   });
  // });

  afterAll(async () => {
    await productStore.delete(productInstance.name);
    await orderStore.delete("2");
    await userStore.delete(userInstance.username);
  });
});
