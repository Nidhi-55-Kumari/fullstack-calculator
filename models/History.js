const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    username: String,
    expression: String,
    result: String
});

module.exports = mongoose.model("History", historySchema);