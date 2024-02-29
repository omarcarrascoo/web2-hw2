const express = require("express");
// const path = require("path");
const Contenedor = require("./products");
const app = express();
const path = require('path')
const engine = require('ejs-mate');
const { mealKits } = require("./fake");
const { getAllCategories } = require("./controllers/category-controller");
console.log(mealKits);
const products = new Contenedor('./productos.txt')

app.set('views', path.join(__dirname, 'views') )
app.engine('ejs', engine);
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index', {mealKits});
});
app.get("/signup", (req, res) => {
    res.render('signup');
});
app.get("/login", (req, res) => {
    res.render('login');
});
app.get("/mealkits", (req, res) => {
    const categories = getAllCategories(mealKits)
    const mealKitsArray = mealKits
    res.render('mealkit', {mealKitsArray, categories});
});
app.get("/mealkits/:category", (req, res) => {
    const categories = getAllCategories(mealKits)
    category = req.params.category
    const filterMealKits = mealKits.filter((item)=>item.category === category)
    const mealKitsArray =filterMealKits
    res.render('mealkit', {mealKitsArray, categories});
});

app.get("/productos", (req, res) =>{
    res.json(products.getAll())
});
app.listen(8080, ()=>{
    console.log("Servidor en puerto", 8080);
});