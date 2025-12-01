const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Création de la table tickets
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL CHECK (status IN ('open','in_progress','closed')),
      priority TEXT NOT NULL CHECK (priority IN ('low','medium','high'))
    )
  `);
});

// CRUD SQL

function createTicket(title, description, status, priority, callback) {
  const query = `INSERT INTO tickets (title, description, status, priority) VALUES (?, ?, ?, ?)`;
  db.run(query, [title, description, status, priority], function(err) {
    callback(err, { id: this.lastID });
  });
}

function getAllTickets(callback) {
  db.all(`SELECT * FROM tickets`, [], callback);
}

function getTicketById(id, callback) {
  db.get(`SELECT * FROM tickets WHERE id = ?`, [id], callback);
}

function updateTicket(id, title, description, status, priority, callback) {
  const query = `UPDATE tickets SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?`;
  db.run(query, [title, description, status, priority, id], function(err) {
    callback(err, this.changes);
  });
}

function deleteTicket(id, callback) {
  const query = `DELETE FROM tickets WHERE id = ?`;
  db.run(query, [id], function(err) {
    callback(err, this.changes);
  });
}

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
};
