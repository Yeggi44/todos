const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next)=> {
  //get token from authorization header

  try {
    const token = req.header("x-auth-token");
    if (token) {
            const decoded = jwt.verify(token, process.env.TODO_APP_JWT_SECRET_KEY);
            req.user = decoded;
            next();
        }
    else {
        return res
        .status(401)
        .json({ status: 0, message: "Not authorized...!" });
    }
  } catch (error) {
    res.status(500).json({
        status: 0,
        message: error.message,
      });
  }
  
};
