class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }
  getUsers = async () => {
    const data = await this.userRepo.findAll();
    return { message: "success", data: data, statusCode: 200 };
  };

  addUser = async (userData) => {
    const result = await this.userRepo.addUser(userData);
    return { message: "success", data: result, statusCode: 200 };
  };

  login = async (userData, passport) => {
    await passport.authenticate(
      "signin",
      { session: false },
      (err, user, info) => {
        if (err) {
          return { message: err.message, statusCode: 401 };
          // return next({ message: err.message, statusCode: 401 });
        }
        if (!user) {
          return { message: info.message, statusCode: 401 };
          // return next({ message: info.message, statusCode: 401 });
        }
        req.user = user;
      }
    );
  };
}

module.exports = UserService;
