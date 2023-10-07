function UsersService(repo) {
  async function getUsers() {
    const data = await repo.user.findAll();
    return data;
  }

  async function addUser(userData) {
    const result = await repo.user.addUser(userData);
    return result;
  }

  return {
    getUsers,
    addUser,
  };
}

module.exports = UsersService;
