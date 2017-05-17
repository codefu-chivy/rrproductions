const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewSchema = new Schema({
    views: Number,
});
 
let Views = mongoose.model("Views", viewSchema);

module.exports = Views;