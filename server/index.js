const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors") ;
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require('dotenv').config()
const Note = require("./Note.js");
const User = require("./User.js");
const { createSecretToken } = require("./utils/secretToken");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser  = require("cookie-parser");
const userVerification = require("./middleware/Auth.js");


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({limit:"100mb",extended:true}));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.post('/',userVerification,(req,res) => {
  const {email,firstName,_id} = req.user;
    return res.json({ status: true, user:{email:email,firstName:firstName,id:_id} })
})

app.post("/signup", async(req, res) => {
    try {
    const { email, password, firstName,lastName } = req.body;
    if(!email || !password || !firstName || !lastName) {
        return res.status(400).json({message:'All fields are required'})
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPass  =  await bcrypt.hash(password, 12);
     const user = await User.create({ email:email, password:hashedPass,firstName:firstName,lastName:lastName});
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
     res.status(201).json({ message: "User signed in successfully", success: true, email, token });

  } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
  }
})
app.post("/login", async(req,res) => {
      try {
    const { email, password } = req.body;
    if(email==="" || password==="" ){
      return res.status(400).json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({message:'User does not exist. Please sign up' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(401).json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     return res.status(201).json({ message: "User logged in successfully", success: true ,token});
   
  } catch (error) {
     return res.status(500).json({ message: "Server error", success: true });
  }
})
app.get("/notes",userVerification,async(req,res) => {
    try {
    const notes = await Note.find({userId:req.user._id});
     return res.status(200).json(notes);
     }catch(e) {
         return res.status(500).json("internal server error");
     }
})

app.get("/notes/:noteId",async(req,res) => {
    const id = req.params.noteId;
    try {
    const note = await Note.findById(id);
     return res.status(200).json(note);
     }catch(e) {
         return res.status(500).json("internal server error");
     }
})

app.post("/note" , userVerification,async(req,res) => {
    try {
    const {title,content} = req.body.data.note;
    const id = req.user._id;
    if(!title || !content) {
        return res.status(400).json({message:"title or description are missing"});
    }
    const note =  new Note({title:title,content:content,userId:id});
     await note.save();
     return res.status(201).json({note,message:"Note added succesfully"});
     }catch(e) {
         return res.status(500).json({message:"internal server error"});
     }
})

app.put("/note/:noteId",async(req,res) => {

  try {
    const {title,content} = req.body;
    const id = req.params.noteId;
    if(!title || !content) {
        return res.status(204).json({message:"title or description are missing"});
    }
    const note = await Note.findByIdAndUpdate(id,{title:title,content:content});
     await note.save();
     return res.status(201).json(note);
     }catch(e) {
         return res.status(500).json({message:"internal server error"});
     }
})
app.delete("/note/:noteId",async(req,res) => {
  try {
    const id = req.params.noteId;
    const note =  await Note.findByIdAndDelete(id);
     return res.status(201).json({message:"Note deleted successfully!"});
     }catch(e) {
         return res.status(500).json({message:"internal server error"});
     }
})

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${process.env.PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));