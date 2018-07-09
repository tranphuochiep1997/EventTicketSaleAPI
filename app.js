const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/Database');
const authRouter = require('./routes/AuthRouter');
const dbRouter = require('./routes/DbRouter');
const eventRouter = require('./routes/EventRouter');
const ticketRouter = require('./routes/TicketRouter');
const trimParam = require('./app/Middlewares/TrimParameter');
const app = express();

//Register Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(trimParam);


//Set up mongoose connection
mongoose.connect(config.MongoDBUrl);
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Register routes
app.use('/', [authRouter, dbRouter]);
app.use('/', ticketRouter);
app.use('/', eventRouter);

// Error handling
app.use(function(err, req, res, next){
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({status: 'INVALID_CONTENT_TYPE'});
  }
  console.log(err);
  return res.status(500).send(err);
});

app.listen(config.PORT, ()=>{
    console.log(`Server is listening on port ${config.PORT}`);
})