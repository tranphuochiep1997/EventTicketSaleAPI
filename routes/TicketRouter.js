const express = require('express');
const ticketRouter = express.Router();
const jwtAuth = require('../app/Middlewares/JwtAuth');
const buyTicketValidator = require('../app/Validators/BuyTicketValidator');
const ticketController = require('../app/Controllers/TicketController');
const authValidator = require('../app/Validators/AuthorizationValidator');

ticketRouter
  .post('/buy-ticket/:id', authValidator, jwtAuth.authenticate, buyTicketValidator, (req, res)=>{
    ticketController.buyTicket(req, res);
  })
  .get('/tickets/:id', authValidator, jwtAuth.authenticate, (req, res)=>{
    ticketController.getPurchaseTicket(req, res);
  })

module.exports = ticketRouter;