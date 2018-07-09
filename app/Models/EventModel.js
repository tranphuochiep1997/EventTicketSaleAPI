const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    banner: {
        type: String,
        required: true
    },
    description: String,
    ticket_total: {
        type: Number,
        required: true,
        min: 1,
    },
    ticket_remaining: {
        type: Number,
        required: true,
        min: 0,
        default: this.ticket_total
    },
    ticket_price: {
        type: Number,
        required: true,
        min: 0
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    ticket_start_date: {
        type: Date,
        required: true
    },
    ticket_end_date: {
        type: Date,
        required: true
    }
}, {collection: "Event"});

//Export
module.exports = mongoose.model("Event", eventSchema);