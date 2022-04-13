const Redis = require("ioredis");
let client;

exports.initializeRedis =() => {
    const LOCAL_REDIS = process.env.LOCAL_REDIS || "false";
    if(LOCAL_REDIS === "true"){
        client = new Redis()
    } else {
            console.log('Connecting to redis cluster')
              client = new Redis.Cluster(
                [
                  {
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT,
                  },
                ]
              );
    }
}

exports.setCache = (key,value) => {
    client.set(key,value);
} 

exports.setHashCache = (hashKey, key, value) => {
    client.hset(hashKey,key,value)
}
exports.getHashCache = (hashKey, key) => {
    return client.hget(hashKey, key);
}

exports.getCache = (key) => {
     return client.get(key);
}
exports.deleteKey = (key) =>{
  return client.del(key)
}

exports.getHashKeys =(hashKey) =>{
  return client.hkeys(hashKey);
}