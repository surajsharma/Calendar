// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
var cors = require("cors");

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.use(cors());

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

app.get("/express_backend", (req, res) => {
    res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
    console.log("Your app is listening on port " + listener.address().port);
});
