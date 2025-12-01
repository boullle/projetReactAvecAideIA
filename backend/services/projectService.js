const projectModel = require("../models/projectModel");

class ProjectService {
  static async getAllProjects() {
    return new Promise((resolve, reject) => {
      projectModel.getAllProjects((err, projects) => err ? reject(err) : resolve(projects));
    });
  }

  static async getProjectById(id) {
    return new Promise((resolve, reject) => {
      projectModel.getProjectById(id, (err, project) => err ? reject(err) : resolve(project));
    });
  }

  static async createProject(name, description, status) {
    return new Promise((resolve, reject) => {
      projectModel.createProject(name, description, status, (err, result) => err ? reject(err) : resolve(result));
    });
  }

  static async updateProject(id, name, description, status) {
    return new Promise((resolve, reject) => {
      projectModel.updateProject(id, name, description, status, (err, changes) => err ? reject(err) : resolve(changes));
    });
  }

  static async deleteProject(id) {
    return new Promise((resolve, reject) => {
      projectModel.deleteProject(id, (err, changes) => err ? reject(err) : resolve(changes));
    });
  }
}

module.exports = ProjectService;

