const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const mongoose = require("mongoose");
const oneDay = 1000 * 60 * 60 * 24;
const expressSession = require('express-session')
const session = {
    secret: "secret",
    resave: false ,
    saveUninitialized: false ,
    cookie: { maxAge: 60 * 60 * 1000 }
}

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true; 
}


const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
    cors(
    {origin: "http://localhost:3000",
    credentials: true
}
)
);
//app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.use(expressSession(session));

app.use(passport.initialize());
app.use(passport.session());
require("./models/User");
require("./services/google-facebook-auth");
require("./services/email-auth");

require("./routes/authRoutes")(app);
mongoose.connect(
    "mongodb+srv://wefriiends-backup:wefriiends2023@cluster0.wir50id.mongodb.net/authorization?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connection Successful!");
    app.listen(HTTP_PORT, () => {
        console.log("API listening on: " + HTTP_PORT);
    });
   
});

