const User = require('../Models/UserModel');

	// check username already exist in DB
	function checkUserExist(req, res, next){
		User.findOne({username: req.body.username}, (err, user)=>{
				if (err){
						console.log(err);
						return res.status(500).send("SERVER_ERROR");
				} 
				if (user){
						res.status(409).send({status: 'USERNAME_EXISTED'});
				} else {
						next();
				}
		});
	};

module.exports = {
	checkUserExist: checkUserExist
};