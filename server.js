const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require("body-parser");
const Contact = require("./models/Contact.js");
require('dotenv').config()
const path = require("path");
const app = express();
const port = 8000

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/api', require('./router/userRoute'))
app.use('/api', require('./router/contactRoute'))


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected")
    app.listen(port, () => {
        console.log(`Server running on ${port}`)
    })
}).catch(error => {
    console.log(error)
})
