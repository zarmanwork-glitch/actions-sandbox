import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import type { Server } from "bun";

let server: Server;
const BASE_URL = "http://localhost:3001";

beforeAll(async () => {
  // Start test server on different port
  process.env.PORT = "3001";
  const module = await import("./index.ts");
  server = module.server;
  await new Promise((resolve) => setTimeout(resolve, 100));
});

afterAll(async () => {
  server.stop();
});

describe("API Endpoints", () => {
  it("GET / returns welcome message", async () => {
    const res = await fetch(`${BASE_URL}/`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.message).toContain("GitHub Actions");
  });

  it("GET /api/health returns healthy status", async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.status).toBe("healthy");
  });

  it("POST /api/echo echoes the message", async () => {
    const res = await fetch(`${BASE_URL}/api/echo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "test" }),
    });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.echo).toBe("test");
  });

  it("POST /api/echo returns 400 without message", async () => {
    const res = await fetch(`${BASE_URL}/api/echo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });
});
