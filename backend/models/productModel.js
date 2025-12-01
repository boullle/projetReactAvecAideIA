const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Création de la table Products
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price > 0),
      stock INTEGER NOT NULL CHECK(stock >= 0)
    )
  `);
});

// CRUD SQL
function createProduct(name, price, stock, callback) {
  const query = `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`;
  db.run(query, [name, price, stock], function (err) {
    callback(err, { id: this.lastID });
  });
}

function getAllProducts(callback) {
  db.all(`SELECT * FROM products`, [], callback);
}

function getProductById(id, callback) {
  db.get(`SELECT * FROM products WHERE id = ?`, [id], callback);
}

function updateProduct(id, name, price, stock, callback) {
  const query = `UPDATE products SET name=?, price=?, stock=? WHERE id=?`;
  db.run(query, [name, price, stock, id], function (err) {
    callback(err, this.changes);
  });
}

function deleteProduct(id, callback) {
  const query = `DELETE FROM products WHERE id = ?`;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
