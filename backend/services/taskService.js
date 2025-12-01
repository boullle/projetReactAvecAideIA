const taskModel = require("../models/taskModel");

class TaskService {
  static async getAllTasks() {
    return new Promise((resolve, reject) => {
      taskModel.getAllTasks((err, tasks) => err ? reject(err) : resolve(tasks));
    });
  }

  static async getTaskById(id) {
    return new Promise((resolve, reject) => {
      taskModel.getTaskById(id, (err, task) => err ? reject(err) : resolve(task));
    });
  }

  static async createTask(title, description, status) {
    return new Promise((resolve, reject) => {
      taskModel.createTask(title, description, status, (err, result) => err ? reject(err) : resolve(result));
    });
  }

  static async updateTask(id, title, description, status) {
    return new Promise((resolve, reject) => {
      taskModel.updateTask(id, title, description, status, (err, changes) => err ? reject(err) : resolve(changes));
    });
  }

  static async deleteTask(id) {
    return new Promise((resolve, reject) => {
      taskModel.deleteTask(id, (err, changes) => err ? reject(err) : resolve(changes));
    });
  }
}

module.exports = TaskService;
