import request from "supertest";
import { describe, it } from "node:test";
import { app } from "../app";

describe("Create user account", () => {
  test.skip("should return status code 201 and return user data", async () => {
    const userData = {
      email: "email@example.com",
      name: "John Doe",
      username: "johndoe64",
      password: "some-password1234",
    };

    const response = await request(app)
      .post("/auth/create-user")
      .send(userData)
      .set("Accept", "application/json");

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBe("email@example.com");
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.username).toBe("johndoe64");
    expect(response.body.accessToken).toBeDefined();
  });

  test("Should return status code 400 and say username or email is already in use", async () => {
    const userData = {
      email: "email@example.com",
      name: "John Doe",
      username: "johndoe64",
      password: "some-password1234",
    };

    const response = await request(app)
      .post("/auth/create-user")
      .send(userData)
      .set("Accept", "application/json");

    console.log(response.body);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});
