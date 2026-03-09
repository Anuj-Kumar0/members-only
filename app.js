require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");
require("./config/passport");


const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


app.use("/", authRouter);
app.use("/", messageRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is Live! - listening on port ${PORT}!`);
});