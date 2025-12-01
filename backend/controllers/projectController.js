// const projectModel = require("../models/projectModel");

// // Récupérer tous les projets
// exports.getAllProjects = async (req, res) => {
//   try {
//     projectModel.getAllProjects((err, projects) => {
//       if (err) {
//         console.error("Erreur lors de la récupération des projets :", err);
//         return res.status(500).json({ error: "Erreur serveur lors de la récupération des projets." });
//       }
//       res.status(200).json(projects);
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Récupérer un projet par ID
// exports.getProjectById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     projectModel.getProjectById(id, (err, project) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
//       if (!project) return res.status(404).json({ error: "Projet non trouvé." });

//       res.status(200).json(project);
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Créer un projet
// exports.createProject = async (req, res) => {
//   try {
//     const { name, description, status } = req.body;

//     if (!name) return res.status(400).json({ error: "Le nom du projet est obligatoire." });

//     const allowedStatus = ["planning", "in_progress", "completed"];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ error: `Status invalide. Valeurs autorisées : ${allowedStatus.join(", ")}` });
//     }

//     projectModel.createProject(name, description || "", status || "planning", (err, result) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la création du projet." });

//       res.status(201).json({ message: "Projet créé avec succès.", id: result.id });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Mettre à jour un projet
// exports.updateProject = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { name, description, status } = req.body;

//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
//     if (!name) return res.status(400).json({ error: "Le nom du projet est obligatoire." });

//     const allowedStatus = ["planning", "in_progress", "completed"];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ error: `Status invalide. Valeurs autorisées : ${allowedStatus.join(", ")}` });
//     }

//     projectModel.updateProject(id, name, description || "", status || "planning", (err, changes) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
//       if (changes === 0) return res.status(404).json({ error: "Projet non trouvé." });

//       res.status(200).json({ message: "Projet mis à jour avec succès." });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Supprimer un projet
// exports.deleteProject = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     projectModel.deleteProject(id, (err, changes) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
//       if (changes === 0) return res.status(404).json({ error: "Projet non trouvé." });

//       res.status(200).json({ message: "Projet supprimé avec succès." });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };


const ProjectService = require("../services/projectService");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des projets." });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    const project = await ProjectService.getProjectById(id);
    if (!project) return res.status(404).json({ error: "Projet non trouvé." });

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur inattendue." });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    if (!name) return res.status(400).json({ error: "Le nom est obligatoire." });

    const result = await ProjectService.createProject(name, description || "", status || "planning");
    res.status(201).json({ message: "Projet créé avec succès.", id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la création du projet." });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, status } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
    if (!name) return res.status(400).json({ error: "Le nom est obligatoire." });

    await ProjectService.updateProject(id, name, description || "", status || "planning");
    res.status(200).json({ message: "Projet mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour du projet." });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    await ProjectService.deleteProject(id);
    res.status(200).json({ message: "Projet supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression du projet." });
  }
};
