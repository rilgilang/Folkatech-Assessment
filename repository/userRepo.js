const hashPassword = require("../helper/passwordSalt");
const { user } = require("../models/models");

class UserRepo {
  findAll = async (params) => {
    const result = await user.find(params);
    return result;
  };

  findOne = async (username) => {
    const result = await user.findOne({ userName: username });
    return result;
  };

  addUser = async (userData) => {
    userData.password = hashPassword(userData.password);
    const newUser = await user.create(userData);
    const result = await user.findOne({
      _id: newUser._id,
    });

    return result;
  };
}

module.exports = UserRepo;
