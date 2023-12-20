const express = require("express");
const app = express();
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/config.env" });
const path = require("path");
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/pages/about/about.html"));
});
app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/pages/products/products.html"));
});
app.get(`/products/:productId`, (req, res) => {
    res.sendFile(path.join(__dirname + "/src/pages/product/product.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/pages/error/error.html"));
});

// const PORT = process.env.PORT || 3000;
app.listen(3000, (err) => {
    if (err) return console.log(`Error: ${err.message}`);
    console.log(`Server listening on port ${3000}`);
});
