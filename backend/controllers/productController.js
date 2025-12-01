const productModel = require("../models/productModel");

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    productModel.getAllProducts((err, products) => {
      if (err) {
        return res.status(500).json({ error: "Erreur serveur lors de la récupération des produits." });
      }
      res.status(200).json(products);
    });
  } catch {
    res.status(500).json({ error: "Erreur inattendue." });
  }
};

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    productModel.getProductById(id, (err, product) => {
      if (err) return res.status(500).json({ error: "Erreur serveur." });
      if (!product) return res.status(404).json({ error: "Produit non trouvé." });
      res.status(200).json(product);
    });

  } catch {
    res.status(500).json({ error: "Erreur inattendue." });
  }
};

// Ajouter un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price == null || stock == null)
      return res.status(400).json({ error: "name, price et stock sont requis." });

    if (price <= 0)
      return res.status(400).json({ error: "Le prix doit être positif." });

    if (!Number.isInteger(stock) || stock < 0)
      return res.status(400).json({ error: "Stock invalide." });

    productModel.createProduct(name, price, stock, (err, result) => {
      if (err) return res.status(500).json({ error: "Erreur serveur lors de la création." });

      res.status(201).json({ message: "Produit créé avec succès.", id: result.id });
    });

  } catch {
    res.status(500).json({ error: "Erreur inattendue." });
  }
};

// Modifier un produit
exports.updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
    if (!name || price == null || stock == null)
      return res.status(400).json({ error: "Tous les champs sont requis." });

    if (price <= 0)
      return res.status(400).json({ error: "Prix invalide." });

    if (!Number.isInteger(stock) || stock < 0)
      return res.status(400).json({ error: "Stock invalide." });

    productModel.updateProduct(id, name, price, stock, (err, changes) => {
      if (err) return res.status(500).json({ error: "Erreur serveur." });
      if (changes === 0) return res.status(404).json({ error: "Produit non trouvé." });

      res.status(200).json({ message: "Produit mis à jour avec succès." });
    });

  } catch {
    res.status(500).json({ error: "Erreur inattendue." });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    productModel.deleteProduct(id, (err, changes) => {
      if (err) return res.status(500).json({ error: "Erreur serveur." });
      if (changes === 0) return res.status(404).json({ error: "Produit non trouvé." });

      res.status(200).json({ message: "Produit supprimé avec succès." });
    });

  } catch {
    res.status(500).json({ error: "Erreur inattendue." });
  }
};
