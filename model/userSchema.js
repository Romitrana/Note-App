const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the Name"],
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
    minlength: 3,
  },
});

UserSchema.pre("save", async function (next) {
  // mongoose middleware
  const salt = await bcrypt.genSalt(10); //generating bit
  this.password = await bcrypt.hash(this.password, salt); //hashing pw
  next();
});

//for jwt token instance method

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

//for passward compare instance method

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

// If you are using Mongoose for MongoDB and you have defined a schema for your documents, Mongoose will automatically validate the data based on the schema. In this case, you may not necessarily need Joi for validation within the context of MongoDB operations.

// However, if you have additional validation requirements or if you are working with data outside the scope of Mongoose (e.g., validating data before it reaches the Mongoose model), you can use Joi for that purpose. Joi can complement Mongoose validation, and there should not be any inherent conflict between the two.

// In summary, Mongoose handles validation specific to MongoDB and its schema, while Joi can be used for more general data validation needs in your application. They can coexist, and you can choose to use them based on your specific requirements.
