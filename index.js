
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

const app_router = require("./routes/teachers")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use("/api/auth/", router)
app.use("/api/", app_router)

var swaggerOptions = {
    swaggerOptions: {
        // operationsSorter: (a, b) => {
        //     var methodsOrder = ["get", "post", "put", "patch", "delete", "options", "trace"];
        //     var result = methodsOrder.indexOf(a.get("method")) - methodsOrder.indexOf(b.get("method"));

        //     if (result === 0) {
        //         result = a.get("path").localeCompare(b.get("path"));
        //     }

        //     return result;
    }
    // }
};
connect(
    dbURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => {
    console.log("Database started")
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    }).on("error", (err) => {
        console.log(err)
    })
}).catch((err) => {
    console.log(`Error connecting to the database ${err}`)
});




