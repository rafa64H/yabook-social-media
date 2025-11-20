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

    const refreshToken = (
      response.headers["set-cookie"] as any as string[]
    ).some((cookieString) => cookieString.startsWith("refreshToken="));

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(refreshToken).toBeTruthy();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBe("email@example.com");
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.username).toBe("johndoe64");
    expect(response.body.user.password).toBeUndefined();
    expect(response.body.accessToken).toBeDefined();
  });

  test.skip("Should return status code 400 and say username or email is already in use", async () => {
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

describe("Login into account", () => {
  test("Should return status code 200 and return user data", async () => {
    const loginData = {
      emailOrUsername: "email@example.com",
      password: "some-password1234",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginData)
      .set("Accept", "application/json");

    const refreshToken = (
      response.headers["set-cookie"] as any as string[]
    ).some((cookieString) => cookieString.startsWith("refreshToken="));

    expect(response.statusCode).toBe(200);
    expect(refreshToken).toBeTruthy();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBe("email@example.com");
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.username).toBe("johndoe64");
    expect(response.body.user.password).toBeUndefined();
    expect(response.body.accessToken).toBeDefined();
    console.log(response.body.accessToken);
  });

  test.skip("Should return status code 400, return a message and return an array of strings telling the validation errors", async () => {
    const loginData = {
      emailOrUsername: 5,
      password: false,
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginData)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.validationErrors).toBeDefined();
    expect(typeof response.body.validationErrors[0]).toBe("string");
  });
});
