require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const today = require(__dirname + "/date.js");

mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const blogSchema =new mongoose.Schema({
  date: String,
  title: String,
  content: String,
});

const Blog = new mongoose.model("Blog", blogSchema);

app.get("/posts/:postId", (req, res)=>{
  Blog.findOne({_id: req.params.postId}, (err, foundPost)=>{
    res.render("post", {post: foundPost});
  });
});

app.get("/", function(req, res){
  Blog.find({}, (err, blogList)=>{
    if(!err){
      res.render("blog", {blogList:blogList} );
    }
  });
});

app.get("/compose", (req, res)=>{
  res.render("compose");
});


app.post("/", (req, res)=>{
 if(req.body.button === "compose"){
   const newBlogPost = new Blog({
     date: today.getDate(),
     title: req.body.postTitle,
     content: req.body.postContent
   })
   newBlogPost.save((err)=>{
     if(!err){
       res.redirect("/");
     }
   });
 }
});

app.listen(process.env.PORT || 3000 , ()=>{
  console.log("server started");
});
