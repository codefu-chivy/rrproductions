const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let eventsSchema = new Schema({
    location: String,
    description: String
});

module.exports = mongoose.model("event", eventsSchema);