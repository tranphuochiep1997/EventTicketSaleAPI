const User = require('../Models/UserModel');
const Event = require('../Models/EventModel');
const TicketPurchase = require('../Models/TicketPurchaseModel');
const bcrypt = require('bcryptjs');

// Reset database
async function resetDb(req, res){
  try{
    await TicketPurchase.remove();
    await User.remove();
    await Event.remove();
    const hashedPassword = await bcrypt.hash("bapcodewar", 10);
    await User.create({
      username: "BE.admin", 
      password: hashedPassword,
      isAdmin: true
    });
    res.status(200).send({status: 'SUCCESS'});
  } catch(err){
    console.log(err);
  }
};

module.exports = {
  resetDb: resetDb
};