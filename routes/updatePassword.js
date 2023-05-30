const updatePassword = require ("../services/updatePassword");

module.exports = (app) => {
 
  app.patch("api/auth/updatePassword", (req, res) => {
    updatePassword(req.body);
  });
};
