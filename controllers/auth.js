const User = require("../model/userSchema");
const {
  UserValidate,
  loginValidationSchema,
} = require("../validator/validate");

const login = async (req, res) => {
  try {
    await loginValidationSchema.validateAsync(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).send("Invalid Credential");
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid Credential");
    }
    //generate token
    const token = user.createJWT();

    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const register = async (req, res) => {
  try {
    await UserValidate.validateAsync(req.body);
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

module.exports = { login, register };
