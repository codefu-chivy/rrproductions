const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let subSchema = new Schema({
    subscribers: Array
});

let Subs = mongoose.model("Sub", subSchema);

module.exports = Subs;