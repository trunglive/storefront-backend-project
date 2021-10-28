import { OrderStore } from "../order";

const store = new OrderStore();

describe("Order Model", () => {
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
    const { status, userId } = await store.create({
      status: "ordered", // ordered - shipped - delivered
      userId: 6,
    });

    expect({ status, userId }).toEqual({
      status: "ordered",
      userId: 6,
    });
  });

  it("index method should return a list of all orders", async () => {
    const [{ status, userId }] = await store.index();

    expect([{ status, userId }]).toEqual([
      {
        status: "ordered",
        userId: 6,
      },
    ]);
  });

  it("show method should return the orders of a user", async () => {
    const { status, userId } = await store.show("6");

    expect({ status, userId }).toEqual({
      status: "ordered",
      userId: 6,
    });
  });
});
