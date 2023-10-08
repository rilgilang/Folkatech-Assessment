const validator = require("validator");

class UserHandlers {
  constructor(userService, passport) {
    this.userService = userService;
  }

  getOneUserHandler = async (req, res) => {
    try {
      const ObjectId = require("mongoose").Types.ObjectId;
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "id is not valid" });
      }

      const result = await this.userService.getOneUsers(id);
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  getUserHandler = async (req, res) => {
    try {
      const { account_number, identity_number } = req.query;

      if (account_number && identity_number) {
        return res.status(400).json({
          message: "cannot receive multiple params choose one",
        });
      }

      let params = {};

      if (account_number && !identity_number) {
        params = {
          accountNumber: account_number,
        };
      }

      if (!account_number && identity_number) {
        params = {
          identityNumber: identity_number,
        };
      }

      const result = await this.userService.getUsers(params);
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  createUserHandler = async (req, res) => {
    try {
      const errorMessages = [];
      const validate = [
        "username",
        "account_number",
        "email",
        "identity_number",
        "password",
      ];

      validate.map((x) => {
        if (
          !req.body[x] ||
          req.body[x] === "" ||
          validator.isEmpty(`${req.body[x]}`)
        ) {
          errorMessages.push(`${x} cannot be empty`);
        }
      });

      if (errorMessages.length > 0) {
        return res.status(400).json({ message: errorMessages });
      }

      if (!validator.isEmail(req.body.email)) {
        errorMessages.push(`email not valid`);
      }

      if (errorMessages.length > 0) {
        return res.status(400).json({ message: errorMessages });
      }

      let user = {
        userName: req.body.username,
        password: req.body.password,
        accountNumber: req.body.account_number,
        emailAddress: req.body.email,
        identityNumber: req.body.identity_number,
      };

      const result = await this.userService.addUser(user);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };

  updateUserHandler = async (req, res) => {
    try {
      if (
        !req.body.email &&
        !req.body.account_number &&
        !req.body.identity_number
      ) {
        return res.status(400).json({
          message: `need one of these to update email, account_number, identity_number`,
        });
      }

      if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.status(400).json({
          message: `email not valid`,
        });
      }

      let user = {
        accountNumber: req.body.account_number,
        emailAddress: req.body.email,
        identityNumber: req.body.identity_number,
      };

      const result = await this.userService.updateUser(req.user.user, user);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };

  loginHandler = async (req, res) => {
    try {
      const result = await this.userService.login(req.user, this.passport);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };

  deleteHandler = async (req, res) => {
    try {
      const { confirmation } = req.body;

      if (!confirmation) {
        return res.status(400).json({
          message: `confirmation cannot be empty`,
        });
      }

      if (confirmation != "delete") {
        return res.status(400).json({
          message: `confirmation must be "delete"`,
        });
      }

      const result = await this.userService.deleteUser(req.user.user);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };
}

module.exports = UserHandlers;
