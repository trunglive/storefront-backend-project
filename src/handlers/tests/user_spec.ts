import supertest from "supertest";
import app from "../../server";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW5ndm82IiwiaWF0IjoxNjM1OTUyMTcyfQ.d2OFXpnjwcSnkFDv9ZuFiMXgpvIr2WZIbEHaKummVeU";

dotenv.config();

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, BCRYPT_TOKEN_SECRET } = process.env;

describe("User Handler", () => {
  it("should return success for READ all users", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ specific user", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" })
      .send("username=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for CREATE user", async () => {
    const pepperedPassword = `Daa48172${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const response = await request.post("/users/register").send({
      firstname: "Daniel",
      lastname: "Austin",
      username: "daniela035",
      password: hashPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for LOGIN user", async (done) => {
    const response = await request
      .delete("/users/login")
      .send({ username: "daniela035", password: "Daa48172" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
