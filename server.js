const mongoose = require("mongoose");
require("dotenv").config();
require("colors");


const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database Connection Is Successful 🛢`.red.bold);
})

// server
const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(`App Is Running On Port ${port}`.yellow.bold);
});