const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = mongoose.model("users");

const updatePassword = async (req, res) => {
  const { email, password, password2 } = req.body;

  const user = await User.findOne({ userId: email });
  if (!user) {
    return res.status(400).send("User doesn't exist");
  }
  if (password !== password2) {
    return res.status(422)
    .send("Password do not match");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let updatedUser = {
    userId: userData.email,
    password: hashedPassword,
  };
  try {
    const result = await updateUser(updatedUser);
  } catch (e) {
    res.status(422).send("Error!");
  }
};

const updateUser = async (updatedUser) => {
  try {
    const result = await User.updateOne(
      { userId: updatedUser.userId },
      {
        $set: {
          password: updatedUser.password,
        },
      }
    );
    return result;
  } catch (error) {
    return error.status;
  }
};

module.exports = { updatePassword };
