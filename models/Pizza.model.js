//const {mongoose, Schema} = require("mongoose");
//two lines below equals to the one above
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema(a pattern that every doc should follow for file consistency)
const pizzaSchema = new Schema({
    title: {
        type: String,
        // unique: true(this would mean that each title should be unique,meaning i cannot have 2 pizza titled "margarita")
    },
    price: {
        type: Number,
        required: true,  //i cannot create a pizza if i don't provide a price
        min: 5// setting a min price(or value)
    },
    isveggie: {
        type: Boolean,
        default: false//by default, if nothing is mentioned about veggie then it is not a veggie pizza.
    },
    dough: {
        type: String,
        enum: ["classic", "extra thin", "with cheese", "with garlic"]//enum gives a limited number of options for my values, meaning it can only be one of these 3 options
    },
    ingredients: [String],//(an array of strings)
    imageFile: String
});//telling mongoose that my pizzas will have a title which is a string

//create Model
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;//i am exporting this models to be importable in other files