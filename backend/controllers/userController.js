

// const userModel = require("../models/userModel");

// // Récupérer tous les utilisateurs
// exports.getAllUsers = async (req, res) => {
//   try {
//     userModel.getAllUsers((err, users) => {
//       if (err) {
//         console.error("Erreur lors de la récupération des utilisateurs :", err);
//         return res.status(500).json({ error: "Erreur serveur lors de la récupération des utilisateurs." });
//       }
//       res.status(200).json(users);
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Récupérer un utilisateur par ID
// exports.getUserById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     userModel.getUserById(id, (err, user) => {
//       if (err) {
//         console.error("Erreur lors de la récupération de l'utilisateur :", err);
//         return res.status(500).json({ error: "Erreur serveur." });
//       }
//       if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

//       res.status(200).json(user);
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Créer un nouvel utilisateur
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "Tous les champs sont requis." });
//     }

//     if (password.length < 8) {
//       return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });
//     }

//     userModel.createUser(name, email, password, (err, result) => {
//       if (err) {
//         if (err.message.includes("UNIQUE constraint failed")) {
//           return res.status(409).json({ error: "Email déjà utilisé." });
//         }
//         console.error("Erreur lors de la création :", err);
//         return res.status(500).json({ error: "Erreur serveur lors de la création." });
//       }
//       res.status(201).json({ message: "Utilisateur créé avec succès.", id: result.id });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Mettre à jour un utilisateur
// exports.updateUser = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { name, email, password } = req.body;

//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "Tous les champs sont requis." });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });
//     }

//     // Implémentation à ajouter dans userModel : updateUser(id, name, email, password, callback)
//     userModel.updateUser(id, name, email, password, (err) => {
//       if (err) {
//         console.error("Erreur lors de la mise à jour :", err);
//         return res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
//       }
//       res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Supprimer un utilisateur
// // exports.deleteUser = async (req, res) => {
// //   try {
// //     const id = parseInt(req.params.id);
// //     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

// //     // Implémentation à ajouter dans userModel : deleteUser(id, callback)
// //     userModel.deleteUser(id, (err) => {
// //       if (err) {
// //         console.error("Erreur lors de la suppression :", err);
// //         return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
// //       }
// //       if (this.changes === 0) {
// //         return res.status(404).json({ error: "Utilisateur non trouvé." });
// //       }
// //       res.status(200).json({ message: "Utilisateur supprimé avec succès." });
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: "Erreur inattendue." });
// //   }
// // };

// exports.deleteUser = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     userModel.deleteUser(id, (err, changes) => {
//       if (err) {
//         console.error("Erreur lors de la suppression :", err);
//         return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
//       }

//       // Si aucune ligne affectée → ID inexistant
//       if (changes === 0) {
//         return res.status(404).json({ error: "Utilisateur non trouvé." });
//       }

//       res.status(200).json({ message: "Utilisateur supprimé avec succès." });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };




const UserService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des utilisateurs." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    const user = await UserService.getUserById(id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur inattendue." });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Tous les champs sont requis." });

    if (password.length < 8)
      return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });

    const result = await UserService.createUser(name, email, password);
    res.status(201).json({ message: "Utilisateur créé avec succès.", id: result.id });

  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed"))
      return res.status(409).json({ error: "Email déjà utilisé." });

    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la création de l'utilisateur." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
    if (!name || !email || !password)
      return res.status(400).json({ error: "Tous les champs sont requis." });
    if (password.length < 8)
      return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });

    await UserService.updateUser(id, name, email, password);
    res.status(200).json({ message: "Utilisateur mis à jour avec succès." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    await UserService.deleteUser(id);
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
};
