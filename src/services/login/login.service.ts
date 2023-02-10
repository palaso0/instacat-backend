import { User } from "../../models/user.model";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export class LoginService {
  async isLoginValid(email: string, password: string): Promise<boolean> {

    const user: any = await User.findOne({
      where: {
        email: email,
      },
    });
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email },
      attributes: ["userId", "email", "name", "lastName", "userName", "photo"],
    });
    return user;
  }
}
