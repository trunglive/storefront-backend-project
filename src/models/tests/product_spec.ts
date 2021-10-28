import { ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const { name, price } = await store.create({
      name: "banana",
      price: 4,
    });

    expect({ name, price }).toEqual({
      name: "banana",
      price: 4,
    });
  });

  it("index method should return a list of products", async () => {
    const [{ name, price }] = await store.index();

    expect([{ name, price }]).toEqual([
      {
        name: "banana",
        price: 4,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const { name, price } = await store.show("banana");

    expect({ name, price }).toEqual({
      name: "banana",
      price: 4,
    });
  });

  it("delete method should remove the product", async () => {
    await store.delete("banana");
    const result = await store.show("banana");

    // @ts-ignore
    expect(result).toBe(undefined);
  });
});
