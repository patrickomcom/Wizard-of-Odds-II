require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("./config/mongoose.config");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));


require("./routes/user.routes")(app);

require("./routes/deck.routes")(app);





app.listen(process.env.PORT, ()=>
    console.log("Listening on",process.env.PORT )
);