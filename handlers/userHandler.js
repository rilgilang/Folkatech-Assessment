const validator = require("validator");

class UserHandlers {
  constructor(userService, passport) {
    this.userService = userService;
    this.passport = passport;
  }

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
}

module.exports = UserHandlers;
