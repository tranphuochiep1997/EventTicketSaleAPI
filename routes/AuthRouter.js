const express = require('express');
const authRouter = express.Router();
const userMiddleware = require('../app/Middlewares/UserMiddleware');
const authController = require('../app/Controllers/AuthController');
const credentialValidator = require('../app/Validators/CredentialValidator');

authRouter
  .post('/login', credentialValidator, (req, res)=>{
    authController.login(req, res);
  })
  .post('/register', credentialValidator, userMiddleware.checkUserExist, (req, res)=>{
      authController.register(req, res);
  });

module.exports = authRouter;