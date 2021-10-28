import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User, UserStore } from "../user";

dotenv.config();

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, BCRYPT_TOKEN_SECRET } = process.env;

const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a login method", () => {
    expect(store.login).toBeDefined();
  });

  it("create method should add a user", async () => {
    const pepperedPassword = `Daa48172${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      firstname: "Daniel",
      lastname: "Austin",
      username: "daniela035",
      password: hashPassword as string,
    };

    const { username } = await store.create(user);

    expect({ username }).toEqual({
      username: "daniela035",
    });
  });

  it("index method should return a list of users", async () => {
    const [{ firstname, lastname, username }] = await store.index();

    expect([{ firstname, lastname, username }]).toEqual([
      {
        firstname: "Daniel",
        lastname: "Austin",
        username: "daniela035",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const { firstname, lastname, username } = await store.show("daniela035");

    expect({ firstname, lastname, username }).toEqual({
      firstname: "Daniel",
      lastname: "Austin",
      username: "daniela035",
    });
  });

  // it("login method should generate the token", async () => {
  // });
});
