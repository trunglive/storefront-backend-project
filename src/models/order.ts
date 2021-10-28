import Client from "../database";

export type Order = {
  status: string;
  userId: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const sql = "SELECT * from orders";
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all orders. Error: ${err}`);
    }
  }

  async show(userId: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to find orders from user ${userId}. Error: ${err}`
      );
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.userId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to add new order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
