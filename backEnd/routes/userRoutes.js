import express from "express";
import { loginUser, registerUser, adminLogin, getUserProfile, createToken } from "../controllers/userControllers.js";
import authUser from "../middleware/auth.js";
import passport from 'passport';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/profile', authUser, getUserProfile);

// Google OAuth Routes
userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        const token = createToken(req.user._id);
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?token=${token}`);
    }
);

export default userRouter; 