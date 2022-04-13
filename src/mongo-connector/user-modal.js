const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first: {
      type: "String"
    },
    last: {
      type: "String"
    },
    age: {
    type: "Number"
    },
    address: {
      addr1: {
        type: "String"
      },
      State: {
        type: "String"
      },
      City: {
        type: "String"
      },
      zip: {
        type: "String"
      }
    }
},
{ collection: 'Users' });

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;