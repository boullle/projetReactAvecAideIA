// const taskModel = require("../models/taskModel");

// // Récupérer toutes les tâches
// exports.getAllTasks = async (req, res) => {
//   try {
//     taskModel.getAllTasks((err, tasks) => {
//       if (err) {
//         console.error("Erreur lors de la récupération des tâches :", err);
//         return res.status(500).json({ error: "Erreur serveur lors de la récupération des tâches." });
//       }
//       res.status(200).json(tasks);
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Récupérer une tâche par ID
// exports.getTaskById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     taskModel.getTaskById(id, (err, task) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
//       if (!task) return res.status(404).json({ error: "Tâche non trouvée." });

//       res.status(200).json(task);
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Créer une nouvelle tâche
// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, status } = req.body;

//     if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

//     // Status autorisé : "pending", "in_progress", "done"
//     const allowedStatus = ["pending", "in_progress", "done"];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ error: `Status invalide. Valeurs autorisées : ${allowedStatus.join(", ")}` });
//     }

//     taskModel.createTask(title, description || "", status || "pending", (err, result) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la création de la tâche." });

//       res.status(201).json({ message: "Tâche créée avec succès.", id: result.id });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Mettre à jour une tâche
// exports.updateTask = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { title, description, status } = req.body;

//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
//     if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

//     const allowedStatus = ["pending", "in_progress", "done"];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ error: `Status invalide. Valeurs autorisées : ${allowedStatus.join(", ")}` });
//     }

//     taskModel.updateTask(id, title, description || "", status || "pending", (err, changes) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
//       if (changes === 0) return res.status(404).json({ error: "Tâche non trouvée." });

//       res.status(200).json({ message: "Tâche mise à jour avec succès." });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Supprimer une tâche
// exports.deleteTask = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     taskModel.deleteTask(id, (err, changes) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
//       if (changes === 0) return res.status(404).json({ error: "Tâche non trouvée." });

//       res.status(200).json({ message: "Tâche supprimée avec succès." });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };


const TaskService = require("../services/taskService");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des tâches." });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    const task = await TaskService.getTaskById(id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée." });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur inattendue." });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

    const result = await TaskService.createTask(title, description || "", status || "pending");
    res.status(201).json({ message: "Tâche créée avec succès.", id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la création de la tâche." });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;

    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
    if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

    await TaskService.updateTask(id, title, description || "", status || "pending");
    res.status(200).json({ message: "Tâche mise à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour de la tâche." });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    await TaskService.deleteTask(id);
    res.status(200).json({ message: "Tâche supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression de la tâche." });
  }
};
