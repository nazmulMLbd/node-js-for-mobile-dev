const mongoose = require("mongoose");

const connectedDB = (url) => {
    console.log("connect db");
    return mongoose.connect(url);
}

module.exports = connectedDB;