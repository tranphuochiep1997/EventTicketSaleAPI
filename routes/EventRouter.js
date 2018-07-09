const express = require('express');
const eventRouter = express.Router();
const eventController = require('../app/Controllers/EventController');
const jwtAuth = require('../app/Middlewares/JwtAuth');
const authValidator = require('../app/Validators/AuthorizationValidator');
const createEventValidator = require('../app/Validators/CreateEventValidator');

eventRouter
  .get('/events', (req, res)=>{
    eventController.getAll(req, res);
  })
  .post('/event/:id',authValidator, jwtAuth.authenticate, jwtAuth.isAdmin, createEventValidator,(req, res)=>{
    eventController.update(req, res);
  })
  .post('/event', authValidator, jwtAuth.authenticate, jwtAuth.isAdmin, createEventValidator, (req, res)=>{
    eventController.create(req, res);
  })
  .get('/event/:id', (req, res)=>{
    eventController.getById(req, res);
  })
  .delete('/event/:id',authValidator, jwtAuth.authenticate, jwtAuth.isAdmin, (req, res)=>{
    eventController.deleteById(req, res);
  })

module.exports = eventRouter;