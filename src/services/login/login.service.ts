import bcrypt from "bcrypt";

export class LoginService {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  async isLoginValid(email: string, password: string): Promise<boolean> {
    const user: any = await this.User.findOne({
      where: {
        email: email,
      },
    });
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
  }

  async getUserByEmail(email: string) {
    const user = await this.User.findOne({
      where: { email: email },
      attributes: ["userId", "email", "name", "lastName", "userName", "photo"],
    });
    return user;
  }
}
