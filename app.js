const express = require("express");

const app = express();

//app.get(path, code);
//app.get (path, (req,res, next) => {});

// GET HOME
app.get("/", function (req, res, next){
    console.log("we have received a request");
    res.sendFile(__dirname + "/views/home-page.html");
});

//GET CONTACT
app.get("/contact", (req,res,next)=>{
    res.sendFile(__dirname + "/views/contact-page.html")
})

app.use(express.static('public')); //Make everything in public folder available





app.listen(3000); //port number(localhost:3000/about)--then message shows up(line6)
