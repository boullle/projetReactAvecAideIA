const ticketModel = require("../models/ticketModel");

class TicketService {
  static async getAllTickets() {
    return new Promise((resolve, reject) => {
      ticketModel.getAllTickets((err, tickets) => err ? reject(err) : resolve(tickets));
    });
  }

  static async getTicketById(id) {
    return new Promise((resolve, reject) => {
      ticketModel.getTicketById(id, (err, ticket) => err ? reject(err) : resolve(ticket));
    });
  }

  static async createTicket(title, description, status, priority) {
    return new Promise((resolve, reject) => {
      ticketModel.createTicket(title, description, status, priority, (err, result) => err ? reject(err) : resolve(result));
    });
  }

  static async updateTicket(id, title, description, status, priority) {
    return new Promise((resolve, reject) => {
      ticketModel.updateTicket(id, title, description, status, priority, (err, changes) => err ? reject(err) : resolve(changes));
    });
  }

  static async deleteTicket(id) {
    return new Promise((resolve, reject) => {
      ticketModel.deleteTicket(id, (err, changes) => err ? reject(err) : resolve(changes));
    });
  }
}

module.exports = TicketService;
