import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';

dotenv.config();

const mailgun = new Mailgun(FormData);
const client = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

const sendOTPEmail = async (email, otp) => {
    try {
        const messageData = {
            from: process.env.MAIL_FROM || `Excited User <mailgun@${process.env.MAILGUN_DOMAIN}>`,
            to: email,
            subject: 'Your Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
            html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`
        };

        const result = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData);
        console.log('Email sent successfully:', result);
        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send OTP email' };
    }
};

export default sendOTPEmail;
