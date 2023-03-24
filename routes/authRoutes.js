const passport = require("passport");
const jwt = require("jsonwebtoken");
const userService = require("../services/email-auth.js");

module.exports = (app) => {
  // ================    Email auth routes ======================== //
  
    app.post("/api/auth/register", (req, res) => {
        userService
            .registerUser(req.body)
            .then((msg) => {
                res.json({ message: msg });
            })
            .catch((msg) => {
                res.status(422).json({ message: msg });
            });
    });

    app.post("/api/auth/signin", (req, res) => {
        userService.checkUser(req.body)
            .then((user) => {
                let payload = {
                    _id: user._id,
                    userId: user.userId,
                };
                let token = jwt.sign(payload, process.env.JWT_SECRET);
                res.json({ message: "login successful", token: token });
            })
            .catch((msg) => {
                res.status(422).json({ message: msg });
            });
    });

    app.get("/api/auth/confirm/:confirmationCode", (req, res) => {
      console.log("user is ", req.user)
            userService
                .verifyUserEmail(req.params.confirmationCode)
                .then((msg) => res.json({ message: msg }))
                .catch((msg) => {
                res.status(422).json({ message: msg });
            });
    });

  // ====================  Google auth routes =========================== //
    app.get(
        "/api/auth/google", 
        passport.authenticate("google", { scope: ["email", 'profile'] })
    );
    
    app.get("/api/auth/login/failed", (req,res) => {
        res.status(401).json({
            success: false, 
            message: 'Failure of login attempt'
        })
    });

    app.get("/api/auth/login/success", (req,res) => {
      console.log("user ", req.user)
        if (req.user) {
            let payload = {
                _id: req.user._id,
                userId: req.user.userId,
            };
            let token = jwt.sign(payload, 'secret');
            res.status(200).json({
                success: true,
                token: token
            })
        } else {
            res.status(400).json({
                success: false,
                message: "User not Authorized"
            })
        }
    });
    
    app.get("/api/auth/google/callback", passport.authenticate(
        'google', 
        { 
            successRedirect: 'http://localhost:3000/registration/glad-screen', 
            failureRedirect: "/api/auth/login/failed",
        }),
    // (req, res) => {
    //     var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
    //     responseHTML = responseHTML.replace('%value%', JSON.stringify({
    //         user: req.user
    //     }));
    //     res.status(200).send(responseHTML);
    
    // }
    );

  // ==================  Facebook auth routes ======================== //
    app.get(
        "/api/auth/facebook",
        passport.authenticate("facebook", { session: false })
    );

    app.get("/api/auth/facebook/callback", (req, res, next) => {
        passport.authenticate("facebook", (err, user, info) => {
            let payload = {
                _id: user._id,
                userId: user.userId,
            };
            let token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ message: "login successful", token: token });
        })(req, res, next);
    });
};
