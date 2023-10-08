class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }
  getUsers = async (params) => {
    const data = await this.userRepo.findAll(params);
    return { message: "success", data: data, statusCode: 200 };
  };

  addUser = async (userData) => {
    const userFound = await this.userRepo.findOne(userData.userName);

    if (userFound) {
      return { message: "username already exist", statusCode: 400 };
    }

    const result = await this.userRepo.addUser(userData);
    return { message: "success", data: result, statusCode: 200 };
  };

  login = async (userData, passport) => {
    const jwt = require("jsonwebtoken");
    const identity = { user: userData.id };

    const token = await jwt.sign(identity, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    return { message: "success", data: token, statusCode: 200 };
  };

  updateUser = async (id, userData) => {
    const data = await this.userRepo.updateUser(id, userData);
    return { message: "success", data: data, statusCode: 200 };
  };

  deleteUser = async (id) => {
    const data = await this.userRepo.deleteUser(id);
    if (data == false) {
      return { message: "error deleting user", statusCode: 500 };
    }
    return { message: "success", data: data, statusCode: 200 };
  };
}

module.exports = UserService;
