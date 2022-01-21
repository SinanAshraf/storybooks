const GoogleStrategy = require('passport-google-oauth20').Strategy
const OAuth2Strategy = require('passport-oauth2')

const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },
        async (accessToken, refreshToken, profile, done) => {

            const newUser = {
                googleId: profile.id,
                displayName: profile.name.givenName + " " + profile.name.familyName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }
            try {
                let user = await User.findOne({ googleId: profile.id })
                if (user) {
                    done(null, user);
                }
                else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            }
            catch (err) {
                console.log(`Error Occured while resolving user ${err}`)
            }
        })
    );

    // passport.use(new WindowsLiveStrategy({
    //     clientID: configAuth.windowsliveAuth.appId,
    //     clientSecret: configAuth.windowsliveAuth.password,
    //     callbackURL: configAuth.windowsliveAuth.callbackURL,
    //     passReqToCallback: true
    // },
    //     function (req, token, refreshToken, profile, done) {
    //         var userid = req.user;
    //         User.findById(userid, function (err, user) {
    //             if (err || !user) {
    //                 console.log("db err")
    //                 return done(null, false, req.flash('message', 'DB error'));
    //             } else {
    //                 if (profile.EmailAddress) {
    //                     user.outlook.email = profile.EmailAddress;
    //                     user.outlook.token = token;
    //                     user.outlook.refreshToken = refreshToken;
    //                     if (profile.MailboxGuid) {
    //                         user.outlook.mailboxGuid = profile.MailboxGuid;
    //                     }
    //                     if (profile.Alias) {
    //                         user.outlook.alias = profile.Alias;
    //                     }
    //                     if (profile.Id) {
    //                         user.outlook.id = profile.Id
    //                     }
    //                     user.save(function (err) {
    //                         if (err) {
    //                             return done(null, false, req.flash('message', 'DB error'));
    //                         } else {
    //                             return done(null, user);
    //                         }
    //                     });
    //                 } else {
    //                     return done(null, false, req.flash('message', 'No email account detected with this account.'));
    //                 }
    //             }
    //         });
    //     }
    // ));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

}