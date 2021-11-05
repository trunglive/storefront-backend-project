import Client from "../database";

export type Product = {
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = "SELECT * from products";
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all products. Error: ${err}`);
    }
  }

  async show(productName: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE name=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [productName]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to find product ${productName}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(productName: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE name=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [productName]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to delete product ${productName}. Error: ${err}`);
    }
  }
}
