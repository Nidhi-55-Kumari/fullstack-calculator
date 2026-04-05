const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const History = require("./models/History");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/calculator");

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("User created");
});

app.post("/login", async (req, res) => {
    const user = await User.findOne(req.body);
    res.json({ success: !!user });
});

app.post("/save", async (req, res) => {
    const history = new History(req.body);
    await history.save();
    res.send("Saved");
});

app.get("/history/:username", async (req, res) => {
    const data = await History.find({ username: req.params.username });
    res.json(data);
});

app.listen(3000, () => console.log("Server running 🚀"));