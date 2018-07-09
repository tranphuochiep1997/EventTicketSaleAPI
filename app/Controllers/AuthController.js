const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/Auth');


function register(req, res){
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      User.create({
        username : req.body.username,
        password : hashedPassword
      })
      .then(createdUser =>{
        res.status(200).send({status: "SUCCESS"});
      })
      .catch(err=>{
        res.status(200).send(err);
      })
};

function login(req, res){
    User.findOne({username: req.body.username}, (err, user)=>{
      if (err){
        console.log(err);
        res.status(500).send('SERVER_ERROR');
      };
      if (!user){
        return res.status(200).send({status: 'USERNAME_PASSWORD_NOT_MATCHED'});
      };
      const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!isValidPassword){
        return res.status(200).send({status: 'USERNAME_PASSWORD_NOT_MATCHED'});
      }
      const payLoad = {
        _id: user._id,
        isAdmin: user.isAdmin
      };
      const token = jwt.sign(payLoad, config.SECRET_KEY, {expiresIn: "2 days"});
      res.status(200).send({status: 'SUCCESS', data: {token: token}});
    }); 
}

module.exports = {
    register: register,
    login: login
};