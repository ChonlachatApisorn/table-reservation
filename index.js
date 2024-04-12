require("dotenv").config();
const express = require('express');
const userRoute = require('./routes/userRoute');
const reserveRoute = require('./routes/reserveRoute')

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/healthchecks", (req, res) => {
    res.send("API Table Reservation is running");
});

app.use('/user', userRoute)
app.use('/reserve', reserveRoute)

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});