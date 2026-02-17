import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/user/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile.emails[0].value });

            if (!user) {
                // Create new user
                // Generate a dummy password for OAuth users since schema requires it
                const dummyPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

                user = await userModel.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: dummyPassword,
                    googleId: profile.id
                });
            } else {
                // Optional: Link googleId if not present
                if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                }
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

export default passport;
