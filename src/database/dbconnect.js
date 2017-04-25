module.exports = function() {
    require("dotenv").config({path: "./src/database/connect.env"});
    const mongoose = require("mongoose");
    mongoose.Promise = require("bluebird");
    const uri = `mongodb://${process.env.MONGOUSER}:${process.env.PASSWORD}@ds131320.mlab.com:31320/rr-productions`;
    mongoose.connect(uri, (err) => {
        if (err) {
            throw err;
        }
    });
}

