import request from "supertest";
import app from "../src/index";

describe("GET /api/health", () => {
  it("returns ok status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /api/users", () => {
  it("returns all seeded users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("email");
  });

  it("filters users by search query", async () => {
    const res = await request(app)
      .get("/api/users")
      .query({ field: "name", search: "Alice" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Alice Johnson");
  });
});

describe("GET /api/users/:id", () => {
  it("returns a user by ID", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Alice Johnson");
  });

  it("returns 404 for non-existent user", async () => {
    const res = await request(app).get("/api/users/999");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });
});

describe("POST /api/users", () => {
  it("creates a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Diana Prince",
      email: "diana@example.com",
      role: "user",
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Diana Prince");
    expect(res.body).toHaveProperty("id");
  });
});
