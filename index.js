
const { router } = require("auth")
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

var session = require("express-session");
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
const connect = mongoose.connect;
const dbURL = process.env.DB_URL;
console.log(dbURL)

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET_KEY,
    })
);

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
app.use("/api/", router)
const uni_router = require("./routes/universities")
app.use("/api/", uni_router)
connect(
    dbURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => {
    console.log("Database started")
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    }).on("error", (err) => {
        console.log(err)
    })
}).catch((err) => {
    console.log(`Error connecting to the database ${err}`)
});




