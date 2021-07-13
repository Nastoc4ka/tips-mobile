const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require('./db');
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to tips-mobile BE application."});
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

