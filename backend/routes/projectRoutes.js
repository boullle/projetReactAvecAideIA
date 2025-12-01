const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// CRUD
router.get("/", projectController.getAllProjects);          // Lire tous les projets
router.get("/:id", projectController.getProjectById);      // Lire un projet par ID
router.post("/", projectController.createProject);         // Créer un projet
router.put("/:id", projectController.updateProject);       // Mettre à jour un projet
router.delete("/:id", projectController.deleteProject);    // Supprimer un projet

module.exports = router;
