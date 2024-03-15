const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyJwt = (req, res, next) => {
const token = req.headers["access-token"];
 
    if (!token) {
    return res.json("No token provided!")
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json("Not Authenticated");
      } else {
        req.useId = decoded.id;
        next();
      }
    })
  }
}

module.exports = verifyJwt;