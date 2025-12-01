const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

// CRUD
router.get("/", ticketController.getAllTickets);          // Lire tous les tickets
router.get("/:id", ticketController.getTicketById);      // Lire un ticket par ID
router.post("/", ticketController.createTicket);         // Créer un ticket
router.put("/:id", ticketController.updateTicket);       // Mettre à jour un ticket
router.delete("/:id", ticketController.deleteTicket);    // Supprimer un ticket

module.exports = router;
