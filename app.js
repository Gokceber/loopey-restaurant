const express = require("express");
const hbs = require("hbs"); //requiring the handlebars package
const Pizza = require("./models/Pizza.model");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1/loopeyRestaurant")
  .then((x) => {
    console.log(`Connected! Database name: "${x.connections[0].name}"`);
  })
  .catch((e) => ("error connecting to DB", e));

app.use(express.static("public")); // Make everything inside of public/ available

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials

// app.get(path, code);
// app.get(path, (req, res, next) => {});

// GET /
app.get("/", (req, res, next) => {
  res.render("home-page");
});

// GET /contact
app.get("/contact", (req, res, next) => {
  res.render("contact-page");
});

/*
// GET /pizzas/margarita
app.get("/pizzas/margarita", (req, res, send) => {
  Pizza.findOne({ title: "margarita" })
    .then((pizzaFromDB) => {
      //console.log(pizzaFromDB);
      res.render("product", pizzaFromDB);
    })
    .catch((e) => console.log("error getting pizza from DB", e));
});

// GET /pizzas/veggie
app.get("/pizzas/veggie", (req, res, send) => {
     Pizza.findOne({title: "veggie"})
        .then((pizzaFromDB)=>{
            res.render("product", pizzaFromDB);
        })
        .catch(e=>console.log("error getting pizza from DB", e));
});

// GET /pizzas/seafood
app.get("/pizzas/seafood", (req, res, send) => {
    Pizza.findOne({title: "seafood"})
        .then((pizzaFromDB)=>{
        res.render("product", pizzaFromDB);  
        })
        .catch(e=>console.log("error getting pizza from DB", e));
});
*/

//// ROUTE PARAMS ////
// :aNameYouChoose(syntax)
app.get("/drinks/:drinkName", (req, res, next) => {
  console.log(req.params);
  res.send(`display info about....${req.params.drinkName}`);
});

//lines between 37-64 were creating specific routes for each pizza
//but it is not sustainable when you have 200 diff. pizzas
//therefore we use url parameters(params) to create generic routes
//that can be reused for each different item
//so, below I create a generic route with param for this purpose

app.get("/pizzas/:pizzaName", (req, res, next) => {
  //console.log(req.params)
  //res.send(`displaying info about...${req.params.pizzaName}`)
  //res.render("product", ${req.params.pizzaName})

  Pizza.findOne({ title: req.params.pizzaName })
    .then((pizzaFromDB) => {
      res.render("product", pizzaFromDB);
    })
    .catch((e) => console.log("error getting pizza from DB", e));
});

app.get("/pizzas", (req, res, next) => {
  //console.log(req.query) req.query is an object
  //console.log(req.query.maxPrice) we will receive a string
  console.log(req.query.maxPrice);

  const maximumPrice = Number(req.query.maxPrice); //convert it to a number
  console.log(maximumPrice)

  let filter = {};
  if (maximumPrice) {
    filter = { price: { $lte: maximumPrice } };
  }
  Pizza.find({ price: { $lte: maximumPrice } })
    .then((pizzas) => {
      const data = {
        pizzasArr: pizzas,
      };
      res.render("product-list", data);
    })
    .catch((e) => console.log("there was an error"));
});

app.listen(3000, () => {
  console.log("server listening on port 3000...");
});
