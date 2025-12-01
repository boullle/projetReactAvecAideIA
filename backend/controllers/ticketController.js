// const ticketModel = require("../models/ticketModel");

// // Récupérer tous les tickets
// exports.getAllTickets = async (req, res) => {
//   try {
//     ticketModel.getAllTickets((err, tickets) => {
//       if (err) {
//         console.error("Erreur lors de la récupération des tickets :", err);
//         return res.status(500).json({ error: "Erreur serveur lors de la récupération des tickets." });
//       }
//       res.status(200).json(tickets);
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Récupérer un ticket par ID
// exports.getTicketById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     ticketModel.getTicketById(id, (err, ticket) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
//       if (!ticket) return res.status(404).json({ error: "Ticket non trouvé." });

//       res.status(200).json(ticket);
//     });
//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Créer un ticket
// exports.createTicket = async (req, res) => {
//   try {
//     const { title, description, status, priority } = req.body;

//     if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

//     const allowedStatus = ["open", "in_progress", "closed"];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ error: `Status invalide. Valeurs autorisées : ${allowedStatus.join(", ")}` });
//     }

//     const allowedPriority = ["low", "medium", "high"];
//     if (priority && !allowedPriority.includes(priority)) {
//       return res.status(400).json({ error: `Priorité invalide. Valeurs autorisées : ${allowedPriority.join(", ")}` });
//     }

//     ticketModel.createTicket(
//       title,
//       description || "",
//       status || "open",
//       priority || "medium",
//       (err, result) => {
//         if (err) return res.status(500).json({ error: "Erreur serveur lors de la création du ticket." });

//         res.status(201).json({ message: "Ticket créé avec succès.", id: result.id });
//       }
//     );

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Mettre à jour un ticket
// exports.updateTicket = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { title, description, status, priority } = req.body;

//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
//     if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

//     const allowedStatus = ["open", "in_progress", "closed"];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ error: `Status invalide. Valeurs autorisées : ${allowedStatus.join(", ")}` });
//     }

//     const allowedPriority = ["low", "medium", "high"];
//     if (priority && !allowedPriority.includes(priority)) {
//       return res.status(400).json({ error: `Priorité invalide. Valeurs autorisées : ${allowedPriority.join(", ")}` });
//     }

//     ticketModel.updateTicket(id, title, description || "", status || "open", priority || "medium", (err, changes) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
//       if (changes === 0) return res.status(404).json({ error: "Ticket non trouvé." });

//       res.status(200).json({ message: "Ticket mis à jour avec succès." });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };

// // Supprimer un ticket
// exports.deleteTicket = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

//     ticketModel.deleteTicket(id, (err, changes) => {
//       if (err) return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
//       if (changes === 0) return res.status(404).json({ error: "Ticket non trouvé." });

//       res.status(200).json({ message: "Ticket supprimé avec succès." });
//     });

//   } catch {
//     res.status(500).json({ error: "Erreur inattendue." });
//   }
// };


const TicketService = require("../services/ticketService");

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketService.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des tickets." });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    const ticket = await TicketService.getTicketById(id);
    if (!ticket) return res.status(404).json({ error: "Ticket non trouvé." });

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur inattendue." });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

    const result = await TicketService.createTicket(title, description || "", status || "open", priority || "medium");
    res.status(201).json({ message: "Ticket créé avec succès.", id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la création du ticket." });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, status, priority } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });
    if (!title) return res.status(400).json({ error: "Le titre est obligatoire." });

    await TicketService.updateTicket(id, title, description || "", status || "open", priority || "medium");
    res.status(200).json({ message: "Ticket mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour du ticket." });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide." });

    await TicketService.deleteTicket(id);
    res.status(200).json({ message: "Ticket supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression du ticket." });
  }
};
