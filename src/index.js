const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const userModel = require("./mongo-connector/user-modal");

const port = process.env.PORT || 3000

app.use(bodyParser.json())

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

mongoose.connect('mongodb://localhost:27017/Customer');
app.get('/', (req, res) => {
  res.send('Welcome to NodeJS with redis cluster demo !!!')
})
app.get('/users', async (req,res)=>{
    const users = await userModel.find({});
    try {
        return res.send(users);
    } catch (error) {
        return res.status(500).send(error);
    }

    // return res.status(200).send({
    //     users,
    // });
})
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})