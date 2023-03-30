import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, subject, pass) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            // secure: true,
            // auth: {
            //     user: email,
            //     pass: pass,
            // },
        });

        await transporter.sendMail({
            from: 'test@testemail.com',
            to: email,
            subject: subject,
            text: "text",
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

export default sendEmail