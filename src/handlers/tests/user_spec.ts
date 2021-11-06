import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";

dotenv.config();
const { JWT_TEST_TOKEN } = process.env;
const token = JWT_TEST_TOKEN as string;

const request = supertest(app);

const userInstance = {
  firstname: "Anthony",
  lastname: "Dan",
  username: "antdn238-user-handler-test",
  password: "CpsodK3918",
};

describe("User Handler", () => {
  it("should return success for CREATE user", async () => {
    const response = await request.post("/users/register").send(userInstance);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ all users", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for READ user by username", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" })
      .send(`username=${userInstance.username}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for LOGIN user", async () => {
    const response = await request.post("/users/login").send({
      username: userInstance.username,
      password: userInstance.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return success for DELETE user by username", async () => {
    const response = await request.delete("/users").send({
      username: userInstance.username,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
