const controller = require ("../services/updatePassword");

module.exports = (app) => {
 
  app.patch("/api/auth/updatePassword", (req, res) => {
    controller.updatePassword(req.body);
  });
};
