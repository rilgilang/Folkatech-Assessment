class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }
  async getUsers() {
    const data = await this.userRepo.findAll();
    return { message: "success", data: data, statusCode: 200 };
  }

  async addUser(userData) {
    const result = await this.userRepo.addUser(userData);
    return { message: "success", data: result, statusCode: 200 };
  }

  async login(userData, passport) {
    passport.authenticate("signin", { session: false }, (err, user, info) => {
      if (err) {
        return { message: err.message, statusCode: 401 };
        // return next({ message: err.message, statusCode: 401 });
      }
      if (!user) {
        return { message: info.message, statusCode: 401 };
        // return next({ message: info.message, statusCode: 401 });
      }
      req.user = user;
    });
  }
}
module.exports = UserService;
