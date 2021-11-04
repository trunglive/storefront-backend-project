import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../user";
import { parseJwt } from "../../utils/parseJwt";

dotenv.config();

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, BCRYPT_TOKEN_SECRET } = process.env;

const store = new UserStore();

const userInstance = {
  firstname: "Justin",
  lastname: "Chan",
  username: "chanju0352-user-model-test",
};

const userInstancePassword = "CodDo128ao";

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
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };

    const { username } = await store.create(user);

    expect({ username }).toEqual({
      username: userInstance.username,
    });
  });

  it("index method should return a list of users", async () => {
    const [{ firstname, lastname, username }] = await store.index();

    expect([{ firstname, lastname, username }]).toEqual([userInstance]);
  });

  it("show method should return the correct user", async () => {
    const { firstname, lastname, username } = await store.show(
      userInstance.username
    );

    expect({ firstname, lastname, username }).toEqual(userInstance);
  });

  it("login method should return the token", async () => {
    const foundUser = await store.login(userInstance.username);
    expect(foundUser).toBeDefined();

    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperedPassword,
      foundUser.password
    );
    expect(validPassword).toBeTrue();

    const token = jwt.sign(
      { username: foundUser.username },
      BCRYPT_TOKEN_SECRET as string
    );
    const { username } = parseJwt(token);
    expect(username).toBe(foundUser.username);
  });
});
