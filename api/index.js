const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');

const app = express();

require("dotenv").config();
const User = require("./models/User.js");
const bcryptSalt =  bcrypt.genSaltSync(10);



// app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", async (req, res) => {
  res.json("test ok");
});

// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

// app.get('/api/test', (req,res) => {
//     mongoose.connect(process.env.MONGO_URL);
//     res.json('test mongo ok');
//   });


app.post('/register', async (req,res) => {
     const {name,email,password} = req.body;
      const NewUser = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
    // res.json({name,email,password});
    res.json(NewUser);
    });
//55.17


// app.post('/register', async (req,res) => {
//     mongoose.connect(process.env.MONGO_URL);
//     const {name,email,password} = req.body;
  
//     try {
//       const userDoc = await User.create({
//         name,
//         email,
//         password:bcrypt.hashSync(password, bcryptSalt),
//       });
//       res.json(userDoc);
//     } catch (e) {
//       res.status(422).json(e);
//     }
  
//   });

app.listen(4000);
