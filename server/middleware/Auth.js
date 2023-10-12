const User = require("../User.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res,next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false,msg:"No token given" })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false,msg:"Error occured",err })
    } else {
      const user = await User.findById(data.id);
      req.user = user;
      if(user) {
        next();
      }
      else{
          return res.json({ status: false,msg:"user not found" });
      }
    }
  })

}
module.exports = userVerification; 