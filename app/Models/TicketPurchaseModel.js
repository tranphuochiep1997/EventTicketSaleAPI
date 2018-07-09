const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketPurchaseSchema = new Schema({
  event_id: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ticket_count: {
    type: Number,
  }
}, {collection: "TicketPurchase"});

//Export
module.exports = mongoose.model("TicketPurchase", ticketPurchaseSchema);