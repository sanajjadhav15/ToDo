const express=require("express");
const bodyParser=require("body-parser");

const app=express();

let items=[];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    var today = new Date();

    var options={
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day=today.toLocaleDateString("en-US",options);

    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req,res){
    let item=req.body.newItem;
    if(req.body.list === " Work List "){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function(){ 
    console.log("Server started on port 3000");
});