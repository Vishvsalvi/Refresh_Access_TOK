const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000



// Using the cookieParser middleware 
app.use(cookieParser())

app.use(express.json())
app.use("/api", require("./Routes/routes"))



// Connecting DB
const connectDB = require("./Db/connectDb");


// connectDB
const start = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()