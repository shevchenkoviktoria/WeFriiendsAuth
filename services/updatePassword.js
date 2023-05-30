const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = mongoose.model("users");

const updatePassword = async (userData, req, res) => {
    console.log("in update password")
  const { email, password1, password2 } = userData;
  console.log(email, password1, password2)
  const user = await User.findOne({ userId: email });
  if (!user) {
    return res.status(400).send("User doesn't exist");
  }
  if (password1 !== password2) {
    return res
      .status(400)
      .json({ success: false, msg: "Passwords do not match" });
  }
  const hashedPassword = await bcrypt.hash(password1, 10);
  const token = jwt.sign(
    { userId: email },
    "secret" // process.env.JWT_SECRET
  );
  let updatedUser = {
    userId: userData.email,
    password: hashedPassword,
    confirmationCode: token,
  };
  updateUser(updatedUser);
};

const updateUser = async (updatedUser) => {
  try {
    await User.updateOne(
      { userId: updatedUser.userId },
      {
        $set: {
          password: updatedUser.password,
          confirmationCode: updatedUser.confirmationCode,
        },
      }
    );
    res.status(200);
  } catch (error) {
    res.status(400);
  }
};

module.exports = {updatePassword};
