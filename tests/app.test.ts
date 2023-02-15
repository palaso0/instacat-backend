import { User } from './../src/models/user.model';
import app from "../src/app";
import request from "supertest";

describe("GET /hello", () => {
  it("Hello API Request", async () => {
    console.log(typeof User);
    console.log(User);
    const result = await request(app).get("/hello");
    expect(result.body).toEqual({ message: "Hello World" });
    expect(result.statusCode).toEqual(200);
  });
});
