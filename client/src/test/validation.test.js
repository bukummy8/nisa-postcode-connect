
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validatePostcode,
  validateAddressDetails
} from "../validation.js";

test("accepts an 11-character alphanumeric postcode", () => {
  const result = validatePostcode("BUKUMMY6000");

  assert.equal(result.valid, true);
  assert.equal(result.normalized, "BUKUMMY6000");
});

test("normalizes lowercase postcode input", () => {
  const result = validatePostcode("bukummy6000");

  assert.equal(result.valid, true);
  assert.equal(result.normalized, "BUKUMMY6000");
});

test("rejects an empty postcode", () => {
  const result = validatePostcode("");

  assert.equal(result.valid, false);
  assert.equal(result.message, "Enter a postcode to continue.");
});

test("rejects a postcode that is too short", () => {
  assert.equal(validatePostcode("ABC123").valid, false);
});

test("rejects a postcode containing internal spaces", () => {
  assert.equal(validatePostcode("BUKUM MY6000").valid, false);
});

test("rejects punctuation in a postcode", () => {
  assert.equal(validatePostcode("BUKUMMY60-0").valid, false);
});

test("rejects address details with missing fields", () => {
  const result = validateAddressDetails({
    postcode: "BUKUMMY6000",
    address: "",
    fullName: "Test Recipient"
  });

  assert.equal(result.valid, false);
  assert.match(result.message, /Complete your name, postcode and address/);
});

test("accepts complete address details with valid postcode format", () => {
  const result = validateAddressDetails({
    postcode: "BUKUMMY6000",
    address: "12 Example Street, Test Town",
    fullName: "Test Recipient"
  });

  assert.equal(result.valid, true);
});
