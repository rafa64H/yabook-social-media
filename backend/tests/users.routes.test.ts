import { describe } from "node:test";
import { app } from "../app";
import request from "supertest";

describe("get one user", () => {
  test("Should return 401", async () => {
    const response = await request(app)
      .get("/api/users/17")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer w");

    expect(response.statusCode).toBe(401);
  });

  test("Should return status 200", async () => {
    const validAccessToken = "";
    const response = await request(app)
      .get("/api/users/17")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${validAccessToken}`);

    expect(response.statusCode).toBe(200);
  });
});
