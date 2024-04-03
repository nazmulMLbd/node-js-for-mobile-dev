require("dotenv").config();
const connectedDB = require("./db/connect");

const Product = require("./models/recipe");

const productJson = require("./recipes.json");

const start = async() => {
    try {
        await connectedDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(productJson);
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}

start();