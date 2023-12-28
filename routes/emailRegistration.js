const passport = require("passport");
const jwt = require("jsonwebtoken");
const userService = require("../services/email-auth.js");

module.exports = (app) => {
  app.post("/api/auth/register", async(req, res) => {
   // const result = await userService.registerUser(req.body);
    
    userService
      .registerUser(req.body)
      .then((msg) => {
        res.json({ message: msg });
      })
      .catch((msg) => {
        res.status(422).json({ message: msg });
      });
  });
};
