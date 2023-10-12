const mongoose = require("mongoose");
const User = require("./User.js")
const NoteSchema = new mongoose.Schema(
  {
     title:String,
     content: String,
     userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
     }
  })
const Note = mongoose.model("Note", NoteSchema);
module.exports =  Note;