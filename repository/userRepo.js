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

  findOneById = async (id) => {
    const result = await user.findOne({ _id: id });
    return result;
  };

  addUser = async (userData) => {
    userData.password = hashPassword(userData.password);
    userData.maxAllowedBorrow = 2;
    userData.currentBorrow = 0;
    const newUser = await user.create(userData);
    const result = await user.findOne({
      _id: newUser._id,
    });

    return result;
  };

  updateUser = async (id, userData) => {
    const updatedUser = await user.updateOne({ _id: id }, userData);
    const result = await user.findOne({
      _id: id,
    });

    return result;
  };

  deleteUser = async (id) => {
    const deletedUser = await user.deleteOne({ _id: id });

    if (deletedUser.acknowledged != true) {
      return false;
    }

    return true;
  };
}

module.exports = UserRepo;
