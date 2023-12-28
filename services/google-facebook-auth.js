const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");


passport.serializeUser((user, done) => {
   console.log("serializeUser called ", user.userId)
      done(null, user.userId);
     
});

passport.deserializeUser((user, done) => {
    console.log('deserialze ', user._id)
  User.findById(user._id, (err, user) => {
    return done(err, user);
  });
});



passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_SECRET,
        callbackURL: "https://clumsy-glasses-clam.cyclic.app/api/auth/google/callback", 
    },                       
     async (accessToken, refreshToken, profile, done) => {  
        console.log('in strategy ', profile) 
        const userFound = await User.findOne({
            $or: [{
                    'userId': profile.emails[0].value
                  }, {
                    'googleId': profile.id
            }]});
        if (userFound) {           
            done(null, userFound);
       } else {            
            console.log('in creating a new user')
            const userToSave = new User({
                userId: profile.name.givenName, //profile.emails[0].value,
                googleId: profile.id,
                status: "Active",
                confirmationCode: "code" + profile.id
            });
            const user = await userToSave.save();
            done (null, user)
        }
    }
      )
);






// //Facebook Auth
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/api/auth/facebook/callback",
//       profileFields: ['id', 'email', 'photos'],
//       //passReqToCallback: true,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       // check if user id already exists
//       User.findOne({ userId: profile.id }).then((existingUser) => {
//         if (existingUser) {
//           done(null, existingUser);
//         } else {
//           // adding new user
//           console.log("Adding a new user");
//           new User({
//             userId: profile.id,
//             status: "Active",
//           })
//             .save()
//             .then((user) => {
//               done(null, user);
//             });
//         }
//       });
//     }
//   )
// );


















// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const mongoose = require("mongoose");
// const User = mongoose.model("users");

// passport.use(
//     new GoogleStrategy({
//         clientID: '681911775744-d9heb5mj2qc9ci3ps9om9eee5325usrj.apps.googleusercontent.com', // process.env.GOOGLE_AUTH_CLIENT_ID,
//         clientSecret: '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', // process.env.GOOGLE_AUTH_SECRET,
//         callbackURL: "http://localhost:8080/api/auth/google/callback",
//      //   passReqToCallback: true
//     },
//     async (accessToken, refreshToken, profile, done) => {       
//         console.log('in strategy')
//         const userFound = await User.findOne({
//             $or: [{
//                     'userId': profile.emails[0].value
//                   }, {
//                     'googleId': profile.id
//             }]});
//         if (userFound) {           
//             done(null, userFound);
//         } else {            
//             const userToSave = new User({
//                 userId: profile.emails[0].value,
//                 googleId: profile.id,
//                 status: "Active",
//                 confirmationCode: "code" + profile.id
//             });
//             const user = await userToSave.save();
//             done (null, user)
//         }
//     }
//   )

//   //          (accessToken, refreshToken, profile, done) => {
     
//   //     // check if user id already exists
//   //       User.findOne({ userId: profile.id }).then((existingUser) => {
//   //           if (existingUser) {
//   //           done(null, existingUser);
//   //           } else {
//   //         // adding new user
//   //               new User({
//   //                   userId: profile.id,
//   //                   status: "Active",
//   //               })
//   //               .save()
//   //               .then((user) => {
//   //                   done(null, user);
//   //               });
//   //           }
//   //       });
//   //   }
//   // )            
// );

// passport.serializeUser((user, done) => {
//    console.log("serializeUser called ", user.userId)
//       done(null, user);
     
// });

// passport.deserializeUser((user, done) => {
//     console.log('deserialze ', user._id)
//   User.findById(user._id, (err, user) => {
//     done(err, user);
//   });
// });

// // //Facebook Auth
// // passport.use(
// //   new FacebookStrategy(
// //     {
// //       clientID: process.env.FACEBOOK_CLIENT_ID,
// //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
// //       callbackURL: "http://localhost:8080/api/auth/facebook/callback",
// //       profileFields: ['id', 'email', 'photos'],
// //       //passReqToCallback: true,
// //     },
// //     (accessToken, refreshToken, profile, done) => {
// //       console.log(profile);
// //       // check if user id already exists
// //       User.findOne({ userId: profile.id }).then((existingUser) => {
// //         if (existingUser) {
// //           done(null, existingUser);
// //         } else {
// //           // adding new user
// //           console.log("Adding a new user");
// //           new User({
// //             userId: profile.id,
// //             status: "Active",
// //           })
// //             .save()
// //             .then((user) => {
// //               done(null, user);
// //             });
// //         }
// //       });
// //     }
// //   )
// // );

