import { User } from "./../../src/models/user.model";
import { Sequelize } from "sequelize";
import app from "../../src/app";
import { LoginService } from "../../src/services/login";
import request from "supertest";

describe("test login service",  () => {
  const loginService = new LoginService(User);
  it("test valid Login", async () => {
    const spy = jest.spyOn(loginService, "isLoginValid");
    await loginService.isLoginValid("test", "test");
    expect(spy).toHaveBeenCalled();
  });
  it("test getUserByEmail", async () => {
    const spy = await jest.spyOn(loginService, "getUserByEmail");
    const resp = await loginService.getUserByEmail("test");
    expect(spy).toHaveBeenCalled();
  });
});
