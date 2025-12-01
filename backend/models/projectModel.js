const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Création de la table projects
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL CHECK (status IN ('planning','in_progress','completed'))
    )
  `);
});

// CRUD SQL

function createProject(name, description, status, callback) {
  const query = `INSERT INTO projects (name, description, status) VALUES (?, ?, ?)`;
  db.run(query, [name, description, status], function(err) {
    callback(err, { id: this.lastID });
  });
}

function getAllProjects(callback) {
  db.all(`SELECT * FROM projects`, [], callback);
}

function getProjectById(id, callback) {
  db.get(`SELECT * FROM projects WHERE id = ?`, [id], callback);
}

function updateProject(id, name, description, status, callback) {
  const query = `UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?`;
  db.run(query, [name, description, status, id], function(err) {
    callback(err, this.changes);
  });
}

function deleteProject(id, callback) {
  const query = `DELETE FROM projects WHERE id = ?`;
  db.run(query, [id], function(err) {
    callback(err, this.changes);
  });
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
};
