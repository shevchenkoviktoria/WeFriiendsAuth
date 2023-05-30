const updatePassword = require ("../services/updatePassword");

module.exports = (app) => {
 
  app.patch("api/auth/updatePassword", (req, res) => {
    console.log(" in route")
    updatePassword(req.body);
  });
};
