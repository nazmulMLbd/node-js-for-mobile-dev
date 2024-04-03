const productJson = require("../recipes.json");
const Product = require("../models/product");
const Recipe = require("../models/recipe");

const getAllProducts = async(req, res) => {

    const { company, name , featured, sort, select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }

    if (featured) {
        queryObject.featured = featured;
    }

    if (name) {
        queryObject.name = {$regex:name, $options: "i"};
    }
    let apiData = Recipe.find(queryObject);

    if (sort) {
        let sortFix = sort.replace(",", " ")
        queryObject.sort = sortFix
        apiData = apiData.sort(sort);
    }

    if (select) {
        //let selectFix = select.replace(",", " ")
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    //const myData = await Product.find(req.query);
    const myData = await apiData;

    res.status(200).json({results: myData});
};

const getAllProductsTesting = async(req, res) => {
    console.log(`getAllProductsTesting ~ ${req.query}`);
    const myData = await Product.find(req.query).sort("-price").select("name, company");
    res.status(200).json({results: myData});
};

module.exports = {getAllProducts, getAllProductsTesting};