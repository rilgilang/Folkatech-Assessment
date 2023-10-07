const hashPassword = require("../helper/passwordSalt");
const { user } = require("../models/models");

class UserRepo {
  async findAll() {
    const result = await user.find({});
    return result;
  }

  async findOne() {
    const result = await user.find({});
    return result;
  }

  async addUser(userData) {
    userData.password = hashPassword(userData.password);
    const newUser = await user.create(userData);
    const result = await user.findOne({
      _id: newUser._id,
    });

    return result;
  }
}

module.exports = UserRepo;
