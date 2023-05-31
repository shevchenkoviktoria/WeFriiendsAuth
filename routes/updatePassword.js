const controller = require ("../services/updatePassword");

module.exports = (app) => {
 
  app.patch("/api/auth/updatePassword", controller.updatePassword);
};
