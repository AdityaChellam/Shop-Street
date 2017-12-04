var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/shopstreet");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//SCHEMA SETUP

var productSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Product = mongoose.model("Product",productSchema);

/*
Product.create(
{
  name: "Headphones",
  image: "http://demo.ajax-cart.com/var/photo/product/2000x4000/4/176/4.jpg",
  description: "This is a best red earphones in VIT. Totally Sound Proof. Owner Aditya Chellam" 
},function(err,product){
  if(err){
    console.log(err);
  }else{
    console.log("Newly Created Product: ");
    console.log(product);
  }
});
*/

app.get("/",function(req,res){
    res.render("landing");
});

//INDEX ROUTE - shows all of a given resource
app.get("/products",function(req,res){
//Get all products
Product.find({},function(err,allProducts){
  if(err){
  	console.log(err);
  }else{
	res.render("index",{products:allProducts});
  }
});
});

//CREATE ROUTE - the route that actually creates the resources
app.post("/products",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newProduct = {name: name, image: image, description: desc};
  //Create a new product and save to DB
  Product.create(newProduct,function(err,newlyCreated){
  if(err){
	console.log(err);
  }else{
	//redirect back to this page
	res.redirect("/products");
  }
});

});


//NEW ROUTE - provides the form to create the new resource
app.get("/products/new",function(req,res){
  res.render("new");
});

//SHOW ROUTE -shows more info about one product
app.get("/products/:id",function(req,res){
  Product.findById(req.params.id,function(err,foundProduct){
    if(err){
	console.log(err);
    }else{
        res.render("show", {product: foundProduct});
    }
  });
});

app.listen(8080);
console.log("shopstreet server running ...");
