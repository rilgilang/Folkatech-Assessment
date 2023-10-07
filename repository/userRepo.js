const hashPassword = require("../helper/passwordSalt");
const { user } = require("../models/models");

function UsersRepo() {
  async function findAll() {
    const result = await user.find({});
    return result;
  }

  async function addUser(userData) {
    userData.password = hashPassword(userData.password);
    const newUser = await user.create(userData);
    const result = await user.findOne({
      _id: newUser._id,
    });

    return result;
  }

  return {
    findAll,
    addUser,
  };
}

module.exports = UsersRepo;
