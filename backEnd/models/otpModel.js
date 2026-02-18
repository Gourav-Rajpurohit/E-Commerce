import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // The document will be automatically deleted after 600 seconds (10 minutes)
    },
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otpSchema);

export default otpModel;
