import { Op } from "sequelize";
import bcrypt from "bcrypt";

export class UserService {
  User: any;
  constructor(User: any) {
    this.User = User;
  }
  async getUsers() {
    const users = await this.User.findAll({
      attributes: ["userId", "email", "name", "lastName", "userName", "photo"],
    });
    return users;
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    lastName: string,
    userName: string,
    photo: string
  ) {
    const hashPassword = await bcrypt.hash(password, 8);
    const newUser: any = await this.User.create(
      {
        email: email,
        password: hashPassword,
        name: name,
        lastName: lastName,
        userName: userName,
        photo: photo,
      },
      {
        fields: [
          "userId",
          "email",
          "password",
          "name",
          "lastName",
          "userName",
          "photo",
        ],
      }
    );
    delete newUser.dataValues["password"];
    return newUser;
  }
  async findUser(id: string) {
    const user = await this.User.findOne({
      where: {
        userId: id,
      },
      attributes: ["userId", "email", "name", "lastName", "userName", "photo"],
    });
    return user;
  }
  async removeUser(id: string) {
    await this.User.destroy({
      where: {
        userId: id,
      },
    });
  }
  async updateUser(
    id: string,
    email: string,
    password: string,
    name: string,
    lastName: string,
    userName: string,
    photo: string
  ) {
    const user: any = await this.User.findByPk(id);
    user.email = email;
    user.password = password;
    user.name = name;
    user.lastName = lastName;
    user.userName = userName;
    user.photo = photo;
    await user.save();
  }
  async userExists(email: string, userName: string): Promise<boolean> {
    const user = await this.User.findOne({
      where: {
        [Op.or]: [{ email: email }, { userName: userName }],
      },
    });
    return user !== null;
  }
}
