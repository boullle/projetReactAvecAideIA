const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Création de la table tasks
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL CHECK (status IN ('pending','in_progress','done'))
    )
  `);
});

// CRUD SQL

function createTask(title, description, status, callback) {
  const query = `INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)`;
  db.run(query, [title, description, status], function(err) {
    callback(err, { id: this.lastID });
  });
}

function getAllTasks(callback) {
  db.all(`SELECT * FROM tasks`, [], callback);
}

function getTaskById(id, callback) {
  db.get(`SELECT * FROM tasks WHERE id = ?`, [id], callback);
}

function updateTask(id, title, description, status, callback) {
  const query = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;
  db.run(query, [title, description, status, id], function(err) {
    callback(err, this.changes);
  });
}

function deleteTask(id, callback) {
  const query = `DELETE FROM tasks WHERE id = ?`;
  db.run(query, [id], function(err) {
    callback(err, this.changes);
  });
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
