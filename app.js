const express=require("express");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');

let Item;
let foundItems;
let defaultItems;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
    const itemsSchema = new mongoose.Schema({
        name: String
    });
    Item = mongoose.model('Item', itemsSchema);
    const item1=new Item({
        name: 'Hello'
    });
    const item2=new Item({
        name: 'Hey'
    });
    const item3=new Item({
        name: 'Hiee'
    });
    defaultItems=[item1,item2,item3];
    foundItems=await Item.find({});
}


const app=express();



app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async function(req, res) {
    try {
        var today = new Date();

        var options = {
            weekday: "long",
            day: "numeric",
            month: "long",
        };

        var day = today.toLocaleDateString("en-US", options);

        foundItems = await Item.find({});

        if (foundItems.length === 0) {
            await Item.insertMany(defaultItems);
            res.redirect("/");
        } else {
            res.render("list", { listTitle: day, newListItems: foundItems });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/", async function(req,res){
    let itemName=req.body.newItem;
    const item=new Item({
        name: itemName
    });
    await item.save();

    res.redirect("/");
});

app.post("/delete", async function(req,res){
    const checkItemId = req.body.checkbox;
    await Item.findByIdAndDelete(checkItemId);
    res.redirect("/");
});

app.listen(3000, function(){ 
    console.log("Server started on port 3000");
});