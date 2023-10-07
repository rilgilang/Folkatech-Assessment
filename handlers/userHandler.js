const validator = require("validator");

class UserHandlers {
  async getUserHandler(req, res) {
    try {
      const service = req.service;
      const result = await service.getUsers();
      return res.status(200).json({ message: "success", data: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async createUserHandler(req, res) {
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

      let user = {
        userName: req.body.username,
        password: req.body.password,
        accountNumber: req.body.account_number,
        emailAddress: req.body.email,
        identityNumber: req.body.identity_number,
      };

      const service = req.service;
      const result = await service.addUser(user);
      return res.status(200).json({ message: "success", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
}

module.exports = new UserHandlers();
