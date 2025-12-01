const userModel = require("../models/userModel");

class UserService {
  static async getAllUsers() {
    return new Promise((resolve, reject) => {
      userModel.getAllUsers((err, users) => err ? reject(err) : resolve(users));
    });
  }

  static async getUserById(id) {
    return new Promise((resolve, reject) => {
      userModel.getUserById(id, (err, user) => err ? reject(err) : resolve(user));
    });
  }

  static async createUser(name, email, password) {
    return new Promise((resolve, reject) => {
      userModel.createUser(name, email, password, (err, result) => err ? reject(err) : resolve(result));
    });
  }

  static async updateUser(id, name, email, password) {
    return new Promise((resolve, reject) => {
      userModel.updateUser(id, name, email, password, (err) => err ? reject(err) : resolve());
    });
  }

  static async deleteUser(id) {
    return new Promise((resolve, reject) => {
      userModel.deleteUser(id, (err) => err ? reject(err) : resolve());
    });
  }
}

module.exports = UserService;
