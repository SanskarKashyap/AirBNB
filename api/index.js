const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

require("dotenv").config();
const User = require("./models/User.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const JWT_SECRET = "fdsafe4dscew21";

// app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", async (req, res) => {
  res.json("test ok");
});

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

// app.get('/api/test', (req,res) => {
//     mongoose.connect(process.env.MONGO_URL);
//     res.json('test mongo ok');
//   });

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ error: "Email address already exists" });
  }

  // Email doesn't exist, proceed with user creation
  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch (error) {
    // Handle any other errors that might occur during user creation
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //find user with email
  const user = await User.findOne({ email });
  //if no user, return error
  if (!user) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }
  //if user, check password
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }
  //if password correct, return jwt token first then send user
  else {
    // jwt.sign({email:user.email,id:user._id,name:user.name},JWT_SECRET,{},(err,token)=>{
    jwt.sign(
      { email: user.email, id: user._id },
      JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  }
});

//55.17

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, JWT_SECRET, {}, async (err, decoded) => {
      if (err) throw err;
      //  const LogedinUser = await User.findById(decoded.id);
      //  res.json(LogedinUser);   // grab whole user details from db with the help of unique ID
      const { name, email, id } = await User.findById(decoded.id);
      res.json({ name, email, id });
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie('token').json('logged out successfully');
});

app.listen(4000);
