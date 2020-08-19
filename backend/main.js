require("dotenv").config();

// ---- Libraries importing
var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("client-sessions");

// ---- Routes importing
const user = require("./Routes/User/user");
const auth = require("./Routes/User/auth");
const DBcontroller = require("./DataBase/DBcontroller");
const externalAPI = require("./Routes/Recipe/ExternalAPI");
const cors=require("cors");
//app.use(cors());

var app = express();

const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));



// ---- App setting and config 

app.use(logger("dev")); //logger
// var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

// parse application/json
app.use(express.json()); // parse application/json
//app.use(bodyParser.json());

// setting cookies configuration
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: false
    }
  })
);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// print request logs
app.use(logger(":method :url :status  :response-time ms"));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });

//#region cookie middleware
app.use(function (req, res, next) {
    if (req.session && req.session.user_id) {
      DBcontroller.execQuery("SELECT user_id FROM users")
        .then((users) => {
          if (users.find((x) => x.user_id === req.session.user_id)) {
            req.user_id = req.session.user_id;
          }
          next();
        })
        .catch((error) => next(error));
    } else {
      next();
    }
  });
// ---- Routing
app.use("/user", user);
app.use("/api", externalAPI);
app.use(auth);


app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});


app.get("/alive",(req, res)=>{
  res.send("I'm alive");
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});


// Default router
app.use( (req,res) => {
  res.sendStatus('400')
});