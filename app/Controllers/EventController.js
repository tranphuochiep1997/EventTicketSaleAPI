const Event = require('../Models/EventModel');

function create(req, res){
    Event.create({
    name: req.body.name,
    banner: req.body.banner,
    description: req.body.description,
    ticket_total: req.body.ticket_total,
    ticket_remaining: req.body.ticket_total,
    ticket_price: req.body.ticket_price,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    ticket_start_date: req.body.ticket_start_date,
    ticket_end_date: req.body.ticket_end_date
  }, (err, createdEvent)=>{
    if (err){
      return res.status(500).send("Sever Error");
    }
    res.status(200).send({status: 'SUCCESS', data: {event_id: createdEvent._id}});
  });
};
function update(req, res) {
  let _id = req.params.id.trim();
    // Set the ticket remaining = total before update
    req.body.ticket_remaining = req.body.ticket_total;
    Event.findByIdAndUpdate(_id, req.body, (err, event)=>{
      if (err){
        console.log(err);
        return res.status(200).send("Server error");
      }
      if (!event){
        return res.status(200).send({status: "EVENT_NOT_EXISTED"});
      }
      return res.status(200).send({status: "SUCCESS"});
    });
}
function getById(req, res){
  let _id = req.params.id.trim();
  if (_id.match(/^[0-9a-fA-F]{24}$/)){
    Event.findById(_id, (err, event)=>{
      if (err){
        console.log(err);
        return res.status(500).send("Sever Error");
      }
      if (!event){
        return res.status(200).send({status: 'EVENT_NOT_EXISTED'});
      }
      const resultFormat = {
        id: event._id,
        name: event.name,
        banner: event.banner,
        description: event.description,
        ticket_total: event.ticket_total,
        ticket_price: event.ticket_price,
        start_date: event.start_date,
        end_date: event.end_date,
        ticket_start_date: event.ticket_start_date,
        ticket_end_date: event.ticket_end_date
      }
      res.status(200).send({status: 'SUCCESS', data: resultFormat});
    });
  }else {
    return res.status(200).send({status: 'EVENT_NOT_EXISTED'});
  }
  
};
function getAll(req, res){
  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page) || 0;
  if(limit < 0){
    limit = 0;
    page = 0;
  };
  Event.find({}, null, {limit: limit, skip: limit*page}, (err, events)=>{
    if (err){
      return res.status(500).send("Server error");
    }
    let eventsFormatted = [];
    if (limit <= events.length) {
      eventsFormatted = events.map(event =>{
        return {
          id: event._id,
          name: event.name,
          banner: event.banner,
          description: event.description,
          ticket_total: event.ticket_total,
          ticket_price: event.ticket_price,
          start_date: event.start_date,
          end_date: event.end_date,
          ticket_start_date: event.ticket_start_date,
          ticket_end_date: event.ticket_end_date
        };
      });
    };
    res.status(200).send({status: 'SUCCESS', data: eventsFormatted});
  });
};

function deleteById(req, res) {
  let _id = req.params.id.trim();

  // check objectId fomat cast
  if (_id.match(/^[0-9a-fA-F]{24}$/)){
    Event.findByIdAndRemove(_id, (err, response)=>{
      if (err){
        console.log(err);
        return res.status(200).send("Server error");
      }
      if (!response){
        return res.status(200).send({status: "EVENT_NOT_EXISTED"});
      }
      return res.status(200).send({status: "SUCCESS"});
    });
  } else {
    return res.status(200).send({status: 'EVENT_NOT_EXISTED'});
  };
};

module.exports = {
  create,
  getById,
  deleteById,
  getAll,
  update
}