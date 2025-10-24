import request from "supertest";
import { describe, it } from "node:test";
import { app } from "../app";

describe("Create user account", () => {
  test("should return status code 201 and return user data", async () => {
    const userData = {
      email: "email@example.com",
      name: "John Doe",
      username: "johndoe64",
      password: "some-password",
    };

    const response = await request(app)
      .post("/auth/create-user")
      .send(userData)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(201);
  });
});
