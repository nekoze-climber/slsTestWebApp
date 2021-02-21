"use strict";
const frisby = require("frisby");

const result = {
  age: 100,
  height: 180,
  name: "taro",
  personId: "xxx",
  weight: 70,
};

describe("Get Person API test", () => {
  it("success case", async () => {
    return frisby
      .get(
        "https://xxx.cloudfront.net/dev/slsTestApp/v1/api/person/xxx"
      )
      .expect("status", 200)
      .expect("jsonTypes", result);
  });
});
