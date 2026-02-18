import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import sendOTPEmail from "../config/mailSender.js";

// Helper function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for user registration
const registerUser = async (req, res) => {

    // console.log("API Working");
    // return res.json({message:"API Working"})

    try {
        const { name, email, password } = req.body;

        // Checking if user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exist" });
        }

        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL_CRED && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for getting user profile data
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData: { name: user.name, email: user.email } });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route to send OTP
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to database
        await otpModel.create({ email, otp });

        // Send Email
        const mailResponse = await sendOTPEmail(email, otp);

        if (mailResponse.success) {
            res.json({ success: true, message: "OTP sent successfully" });
        } else {
            res.json({ success: false, message: "Failed to send OTP" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await otpModel.findOne({ email, otp });

        if (otpRecord) {
            res.json({ success: true, message: "OTP verified successfully" });
        } else {
            res.json({ success: false, message: "Invalid or expired OTP" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to reset password
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Verify OTP again before resetting password
        const otpRecord = await otpModel.findOne({ email, otp });

        if (!otpRecord) {
            return res.json({ success: false, message: "Invalid or expired OTP" });
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Update password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userModel.findOneAndUpdate({ email }, { password: hashedPassword });

        // Delete OTP after successful reset
        await otpModel.deleteOne({ email, otp });

        res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin, getUserProfile, createToken, sendOTP, verifyOTP, resetPassword };