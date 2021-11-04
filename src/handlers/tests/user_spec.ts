import supertest from "supertest";
import app from "../../server";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW5ndm82IiwiaWF0IjoxNjM1OTUyMTcyfQ.d2OFXpnjwcSnkFDv9ZuFiMXgpvIr2WZIbEHaKummVeU";

dotenv.config();

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, BCRYPT_TOKEN_SECRET } = process.env;

const userInstance = {
  firstname: "Anthony",
  lastname: "Dan",
  username: "antdn238-user-handler-test",
  password: "CpsodK3918",
};

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
    const response = await request.post("/users/register").send(userInstance);

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
