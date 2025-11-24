import { describe } from "node:test";
import { app } from "../app";
import request from "supertest";

describe("get one user", () => {
  test.skip("Should return 401", async () => {
    const response = await request(app)
      .get("/api/users/17")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer w");

    expect(response.statusCode).toBe(401);
    expect(response.body.message.includes("jwt")).toBeTruthy();
  });

  test("Should return status 200", async () => {
    const validAccessToken = "";
    const response = await request(app)
      .get("/api/users/17")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${validAccessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBe("email@example.com");
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.username).toBe("johndoe64");
    expect(response.body.user.password).toBeUndefined();
  });
});
