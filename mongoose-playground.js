const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model")//importing Pizza model here    


mongoose.connect("mongodb://127.0.0.1:27017/loopeyRestaurant")
    .then((response) => {
        console.log(
            `Connected! Database Name: "${response.connections[0].name}"`
        );

        const pizzaOne = {//info that i am creating in the database based on the schema
            title: "margarita",
            price: 18,
            isVeggie: true
        }

        //create a new document ( a new pizza)
        return Pizza.create(pizzaOne)

    })
    .then((pizzaFromDB)=> {
        console.log("a new pizza was created with id...", pizzaFromDB._id);
        return Pizza.find({title: "margarita"})
    })
    .then((pizzasArr)=>{
        console.log("I currently have", pizzasArr.length + " pizzas")
        console.log(pizzasArr)

        //Model.findByIdAndUpdate(id, update, {options})--options example-->{returnDocument: 'after'}meaning show me the updated version in the console
        //updating the price of oizza with id: 6478a477631e6d6ce03ab750 to 20
        //return Pizza.findByIdAndUpdate("6478ab28253a612d34d1b97f", {price: 20}, { returnDocument: 'after' })
    
        //below code=set dough: with garlic for all the pizzaz with the price more than 12
        return Pizza.updateMany({price: {$gt: 12} }, {dough: "with garlic"});
    })
    .then( (updatedPizzaFromDB) => {
        console.log("luis, your pizza was updated....")
        console.log(updatedPizzaFromDB)
    })
    .catch((err) => console.error("Error connecting to DB", err));