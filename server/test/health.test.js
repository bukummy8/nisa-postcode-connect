
import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../index.js";

test("GET /api/health returns HTTP 200", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
});

test("health response identifies the service", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.body.status, "ok");
  assert.equal(
    response.body.service,
    "NISA Postcode Connect API"
  );
  assert.equal(response.body.message, "Backend is running");
});

test("health response includes an ISO timestamp", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(
    typeof response.body.timestamp,
    "string"
  );
  assert.ok(
    !Number.isNaN(Date.parse(response.body.timestamp))
  );
});

test("unknown API route returns HTTP 404", async () => {
  const response = await request(app).get("/api/not-a-real-route");

  assert.equal(response.status, 404);
});
