const Event = require('../Models/EventModel');
const TicketPurchase = require('../Models/TicketPurchaseModel');

function buyTicket(req, res) {
  const _id = req.params.id.trim();
    Event.findById(_id, (err, event)=>{
      if (err){
        console.log(err);
        return res.status(200).send({status: "SERVER_ERROR"});
      }
      if (!event){
        return res.status(200).send({status: "EVENT_NOT_EXISTED"});
      }
      let now = new Date();
      if (now < event.ticket_start_date || event.ticket_end_date < now){
        return res.status(200).send({status: "NOT_TIME_BUY_TICKET"});
      }
      if (req.body.quantity > event.ticket_remaining){
        return res.status(200).send({status: "TICKET_SOLD_OUT"});
      }
        // Sub tract the number of ticket remaining
        event.ticket_remaining -= req.body.quantity;
        TicketPurchase.create({
          event_id: _id,
          user_id: req.user._id,
          ticket_count: req.body.quantity
        }, (err, deal)=>{
          if (err){
            return res.status(200).send(err);
          }
          if (deal){
            event.save((err, event)=>{
              if (err){
                TicketPurchase.findByIdAndRemove(deal._id);
                return res.status(500).send("ERROR_WHEN_BUY_TICKET");
              }
              res.status(200).send({status: 'SUCCESS', data:{payment_id: deal._id}});
            });
          } else {
            res.status(200).send("ERROR_WHEN_BUY_TICKET");
          }
        });
  });
};

function getPurchaseTicket(req, res) {
  const _id = req.params.id.trim();
  Event.findById(_id, (err, event)=>{
    if (err){
      return res.status(200).send(err);
    }
    if (!event){
      return res.status(200).send({status: 'EVENT_NOT_EXISTED'});
    }
    TicketPurchase.find({user_id: req.user._id, event_id: _id}, (err, deals)=>{
      if (err){
        return res.status(500).send(err);
      }
      data = [];
      deals.forEach(deal => {
        data.push({
          id: deal._id,
          ticket_count: deal.ticket_count
        });
      });
      res.status(200).send({status: 'SUCCESS', data: data});
  });
  });
}

module.exports = {
  buyTicket,
  getPurchaseTicket
}