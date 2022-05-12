require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin:"http://localhost:3000"
}));


require("./config/mongoose.config");

require("./routes/deck.routes")(app);





app.listen(8000, ()=>{
    console.log("Listening on Port 8000");
})