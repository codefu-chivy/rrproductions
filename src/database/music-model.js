const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let musicSchema = new Schema({
    title: String,
    artName: String,
    views: {
        num: Number,
        ip: Array
    },
    genre: String,
    date: String,
    price: String,
    thumbnail: String,
    videoId: String
});

let Music = mongoose.model("Music", musicSchema);
module.exports = Music;

