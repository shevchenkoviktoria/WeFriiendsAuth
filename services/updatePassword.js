const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = mongoose.model("users");

const updatePassword = async (userData, res) => {
  console.log("in update password");
  const { email, password, password2 } = userData;
  console.log(email, password, password2);
  const user = await User.findOne({ userId: email });
  if (!user) {
    return res.status(400).send("User doesn't exist");
  }
  if (password !== password2) {
    return res
      .status(400)
      .json({ success: false, msg: "Passwords do not match" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign(
    { userId: email },
    "secret" // process.env.JWT_SECRET
  );
  let updatedUser = {
    userId: userData.email,
    password: hashedPassword,
    confirmationCode: token,
  };
  const result = await updateUser(updatedUser);
  console.log("result ", result)
};

const updateUser = async (updatedUser) => {
  try {
    const result = await User.updateOne(
      { userId: updatedUser.userId },
      {
        $set: {
          password: updatedUser.password,
          confirmationCode: updatedUser.confirmationCode,
        },
      }
    );
    return result;
  } catch (error) {
    return error.status
  }
};

module.exports = { updatePassword };
