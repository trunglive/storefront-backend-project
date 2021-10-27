import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

const pepper = process.env.BCRYPT_PEPPER;
const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * from users";
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all users. Error: ${err}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *";

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        u.password,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async login(username: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE username=($1)";

      const result = await conn.query(sql, [username]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable to login user (${username}): ${err}`);
    }
  }
}
