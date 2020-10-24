const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const moviesRouter = require("./routes/routes.movies");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Method", "*");
    next();
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.use(moviesRouter);

app.listen(3000, function(){
    console.log("Server started");
})

