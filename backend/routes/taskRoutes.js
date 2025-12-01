const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// CRUD
router.get("/", taskController.getAllTasks);          // Lire toutes les tâches
router.get("/:id", taskController.getTaskById);      // Lire une tâche par ID
router.post("/", taskController.createTask);         // Créer une tâche
router.put("/:id", taskController.updateTask);       // Mettre à jour une tâche
router.delete("/:id", taskController.deleteTask);    // Supprimer une tâche

module.exports = router;
