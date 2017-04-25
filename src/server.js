const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
const Views = require("./database/view-model");
const dbconnection = require("./database/dbconnect");
const Music = require("./database/music-model");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Subs = require("./database/subscribers-model");
const Isemail = require("isemail");
const User = require("./database/user-model");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const Events = require("./database/events-model");
const nodemailer = require("nodemailer");

dbconnection();
require("dotenv").config({path: "./src/paypal.env"});

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(require('cookie-parser')());
app.use(jsonParser);

passport.use(new Strategy(
  function(username, password, done) {
      console.dir(done);
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GUSER,
        pass: process.env.GPASS
    }
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/index.html");
});

app.get("/views", (req, res) => {
    Views.findOne({}, (err, viewArr) => {
        if (!viewArr) {
            let view = new Views({
                views: 0,
                ip: []
            });
            view.save((err) => {
                if (err) {
                    throw err;
                }
            });
        }
        else {
            if (viewArr.ip.indexOf(req.ip) !== -1) {
                res.json({data: false});
            }
            else {
                viewArr.ip.push(req.ip);
                viewArr.views++;
                viewArr.markModified("ip");
                viewArr.save();
                res.json({data: viewArr.views});
            }
        }
    })
});

app.get("/render-music", (req, res) => {
    Music.find({}, (err, music) => {
        res.json({data: music});
    })
})

app.post("/video-views", jsonParser, (req, res) => {
    Music.findOne({title: req.body.data.name}, (err, obj) => {
        if (obj.views.ip.indexOf(req.ip) === -1) {
            obj.views.num++;
            obj.views.ip.push(req.ip);
            obj.markModified("views");
            obj.save();
            res.json({data: obj});
        }
        else {
            res.json({data: false})
        }
    });
});

app.post("/search", jsonParser, (req, res) => {
    let text = req.body.text;
    Music.find({}, (err, list) => {
        let newList;
        newList = list.filter((ele) => {
            return ele.title.toLowerCase().indexOf(text) !== -1 || ele.genre.toLowerCase().indexOf(text) !== -1 || ele.artName.toLowerCase().indexOf(text) !== -1;
        });
        res.json({data: newList});
    });
});

app.get("/get-id", (req, res) => {
    res.json({data: {prod: process.env.PAYPAL_ID, sandbox: process.env.PAYPAL_SANDBOX}});
});

app.post("/subscribe", jsonParser, (req, res) => {
    Subs.findOne({}, (err, subs) => {
        if (!subs) {
            let subsList = new Subs({
                subscribers: []
            });
            subsList.save();
        }
        else {
            if (subs.subscribers.indexOf(req.body.email) === -1) {
                if (Isemail.validate(req.body.email)) {
                    subs.subscribers.push(req.body.email);
                    subs.markModified("subscribers");
                    subs.save();
                    res.json({data: true});
                }
                else {
                    res.json({data: "invalid"});
                }
            }
            else {
                res.json({data: false})
           }
        }
    });
});

app.post("/login", passport.authenticate("local"), (req, res, next) => {
    console.log("success");
    res.json({data: "success"});
});

app.post("/update-music", (req, res) => {
    let thumbnail = `https://img.youtube.com/vi/${req.body.id}/hqdefault.jpg`
    let date = new Date();
    let current = date.toString().slice(0, 15);
    let MusicList = new Music({
        title: req.body.title,
        artName: req.body.artist,
        views: {
            num: 0,
            ip: []
        },
        genre: req.body.genre,
        date: current,
        price: req.body.price,
        thumbnail: thumbnail,
        videoId: req.body.id
    });
    MusicList.save((err) => {
        if (err) {
            throw err;
        }
        res.json({data: "success"});
    })
});

app.post("/events-update", (req, res) => {
    let eventsList = new Events({
        location: req.body.location,
        description: req.body.description
    });
    eventsList.save();
    Subs.findOne({}, (err, subs) => {
        if (err) {
            throw err;
        }
        subs.subscribers.forEach((email) => {
            let mailOptions = {
                from: "<" + process.env.GUSER + "@gmail.com>", // sender address
                to: email, // list of receivers
                subject: "RRProductions Events Update", // Subject line
                text: req.body.description, // plain text body
                html: "<p>" + req.body.description + "</p>" // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });
        })
        res.json({data: "success"});
    })
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    Music.find({}, (err, musicList) => {
        if (err) {
            throw err;
        }
        let list = musicList.slice(0);
        list.splice(req.body.id, 1);
        musicList[req.body.id].remove();
        res.json({data: list});
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});