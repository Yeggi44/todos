const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { User } = require("../model/user");

//create user
exports.createUser = async (req, res) => {
  try {
    //data validation
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //if user exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists...");

    const { name, email, password } = req.body;

    //create new user
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      jwtSecretKey
    );

    res.send(token);
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({
        status: 0,
        message: error.details[0].message,
      });

    //check email
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send("Email and password does not match our records");

    //check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(400)
        .send("Email and password does not match our records");

    //generate token
    const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      jwtSecretKey
    );

    res.send(token);
  } catch (error) {
    res.status(500).send(error.details[0].message);
  }
};
