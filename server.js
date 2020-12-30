  
const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();

//1-START THE SERVER
const port = 5000;

app.listen(port, () => {
  console.log(`The Server is Running ${port}....`);
});
//2-CONNECT THE DATABASE
connectDB();
//3-SETUP YOUR ENV VARIABLES
require("dotenv").config({ path: "./config/.env" });
//4 BODY PARSER
app.use(express.json());
// CRUD
//5 SCHEMA
const User = require("./models/User");
// POST
app.post("/api/add_user", (req, res) => {
    const { name, lastName, email, age } = req.body;
    const newUser = new User({ name, lastName, email, age }); 
    newUser
      .save()
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send({ msg: "ERROR ADD" }));
  });
// GET ALL USERS

app.get("/api/users", (req, res) => {
    User.find()
      .then((users) => res.send(users))
      .catch((err) => res.status(400).send({ msg: "ERROR GET USERS" }));
  });
// EDIT BY ID
app.put("/api/users/:userID", (req, res) => {
    const userID = req.params.userID;
    User.findByIdAndUpdate(userID, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ msg: "User Not Found " });
        }
        res.send(user);
      })
      .catch((err) => res.status(400).send({ msg: "ERROR" }));
  });
  // REMOVE BY ID
  app.delete("/api/users/:userID", (req, res) => {
    const id = req.params.userID;
    User.findByIdAndDelete(id) 
      .then((user) => {
        if (!user) {
          return res.status(404).send({ msg: "User Not Found " });
        }
        res.send(user);
      })
      .catch((err) => res.status(400).send({ msg: "Error Remove user " }));
  });