const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("./nodemailer-service.js");
let User = mongoose.model("users");

module.exports.registerUser = async(userData, req,res) => {
    if (userData.password !== userData.password2) {
        res.send('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const token = jwt.sign(
        { userId: userData.email },
        'secret'// process.env.JWT_SECRET
    );
    let userToSave = new User({
        userId: userData.email,
        password: hashedPassword,
        confirmationCode: token,
    });
    saveUser(userToSave);
}

const saveUser = async(user, req, res) => {
    try {
        console.log("in try ", user)
    //     user.save((err) => {
    //         console.log("nodemailer is about to send")
    //         // nodemailer.sendConfirmationEmail(userData.email, token);
    //         return res.send("Pending registration confirmation for " + userData.email);
    // });
    user.save()
    .then(res => console.log("nodemailer is about to send"))
    .catch(err => console.log("error ", err))
    } catch(err) {
        console.log("in error")
        if (err.code === 11000) {
            return res.send("This email address is already associated with an account");
        } 
        return res.send("There was an error creating the user: " + err);
    }
}

module.exports.checkUser = async(userData) => {
    try {
        const user = await User.findOne({ userId: userData.email });
        if (!user) {
            return res.status(400).send('Invalid email or password!')
        }
        const isUserValid = await bcrypt.compare(userData.password, user.password);
        if (isUserValid) {
            if (user.status !== 'Active') {
                return res.json({
                    msg: "Pending Account. Please verify your email to gain access to your profile"
                });
            }
            return res.json({msg: "User is signed in"});
        } else {
            return res.json({
                msg: "Incorrect password for user " + userData.email
            })
        }
    } catch(err) {
        return res.json({
            message: "Unable to find user " + userData.email
        })
    }
};

// This function checks confirmationCode in the database and changes user status to Active if a match found
module.exports.verifyUserEmail = (confirmationCode) => {
    return new Promise(function (resolve, reject) {
        User.findOne({
        confirmationCode: confirmationCode,
        })
        .then((user) => {
            if (!user) {
                reject("User Not found.");
            }
            user.status = "Active";
            user.save((err) => {
            if (err) {
                reject({ message: err });
            } else {
                resolve("Account has been activated");
            }
            });
        })
        .catch((err) => reject(err));
    });
};
