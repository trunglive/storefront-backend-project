import { ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
  it("should have an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a DELETE method", () => {
    expect(store.delete).toBeDefined();
  });

  it("CREATE method should add a product", async () => {
    const { name, price } = await store.create({
      name: "banana",
      price: 4,
    });

    expect({ name, price }).toEqual({
      name: "banana",
      price: 4,
    });
  });

  it("INDEX method should return a list of products", async () => {
    const [{ name, price }] = await store.index();

    expect([{ name, price }]).toEqual([
      {
        name: "banana",
        price: 4,
      },
    ]);
  });

  it("SHOW method should return a product by product name", async () => {
    const { name, price } = await store.show("banana");

    expect({ name, price }).toEqual({
      name: "banana",
      price: 4,
    });
  });

  it("DELETE method should remove a product by product name", async () => {
    await store.delete("banana");
    const result = await store.show("banana");

    // @ts-ignore
    expect(result).toBe(undefined);
  });
});
