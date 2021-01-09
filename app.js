const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/users");

const connectDB = require("./config/db");

/*********************** Connecting To MongoDB *****/
connectDB();

/*********************** CORS Middleware *************/

app.use(cors());

/**************** Body Parser Middleware **********/

app.use(bodyParser.json());

/*********************** Routes  *************/

app.use("/users", users);

/*********************** Passport Middleware *************/

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


/*********************** Set static Files  *************/

app.use(express.static(path.join(__dirname, "public")));

app.get('*' ,(req ,res ) =>{
  res.sendFile(path.join(__dirname,public/index.html));
})

/*********************** Server Connection ********************/

app.get("/", (req, res) => {
  res.send({
    msg: "this is response",
    status: 200,
  });
});



var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Env port : ${port}`);
  console.log(`Server is listening at ${port} , http://localhost/${port}`);
});


