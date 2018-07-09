const express = require('express');
const dbRouter = express.Router();
const dbController = require('../app/Controllers/DbController');


dbRouter.get('/reset', (req, res)=>{
  dbController.resetDb(req, res);
});

module.exports = dbRouter;