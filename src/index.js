const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const userModel = require("./mongo-connector/user-modal");
const RedisCache = require("./cacheHandler");
const port = process.env.PORT || 3000

app.use(bodyParser.json())

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

RedisCache.initializeRedis()

mongoose.connect('mongodb://localhost:27017/Customer');
app.get('/', (req, res) => {
  res.send('Welcome to NodeJS with redis cluster demo !!!')
})
app.get('/users', async (req,res)=>{
    const cachedUsers = await RedisCache.getHashCache("Customer", "Users");
    if(cachedUsers != null){
      res.setHeader('x-cache', 'cached');
      return res.send(JSON.parse(cachedUsers));
    } else {
      const users = await userModel.find({});
      RedisCache.setHashCache("Customer", "Users", JSON.stringify(users))
      try {
          res.setHeader('x-cache', 'no-cache');
          return res.send(users);
      } catch (error) {
          return res.status(500).send(error);
      }
    }
})
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})