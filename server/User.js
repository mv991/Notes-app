const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
     email:String,
     password: String,
        firstName:String,
     lastName:String
  })
const User = mongoose.model("User", UserSchema);

module.exports =  User;