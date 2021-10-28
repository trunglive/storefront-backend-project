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

describe("Order Model", () => {
  beforeAll(async () => {
    const pepperedPassword = `Daa48172${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      firstname: "Daniel",
      lastname: "Austin",
      username: "daniela035",
      password: hashPassword as string,
    };
    await userStore.create(user);

    const product: Product = {
      name: "banana",
      price: 4,
    };
    await productStore.create(product);
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add an order", async () => {
    // @ts-ignore
    const { status, user_id } = await store.create({
      status: "ordered", // ordered - shipped - delivered
      userId: 1,
    });

    expect({ status, user_id }).toEqual({
      status: "ordered",
      user_id: "1",
    });
  });

  it("index method should return a list of all orders", async () => {
    // @ts-ignore
    const [{ status, user_id }] = await store.index();

    expect([{ status, user_id }]).toEqual([
      {
        status: "ordered",
        user_id: "1",
      },
    ]);
  });

  it("show method should return the orders of a user", async () => {
    // @ts-ignore
    const { status, user_id } = await store.show("1");

    expect({ status, user_id }).toEqual({
      status: "ordered",
      user_id: "1",
    });
  });
});
