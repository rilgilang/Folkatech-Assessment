const hashPassword = require("../helper/passwordSalt");
const { user } = require("../models/models");

class UserRepo {
  findAll = async () => {
    const result = await user.find({});
    return result;
  };

  findOne = async () => {
    const result = await user.find({});
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
