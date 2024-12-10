// lib/email.ts
import nodemailer from 'nodemailer';

type EmailPayload = {
    to: string;
    subject: string;
    html: string;
};

const smtpOptions = {
    host: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT as string) ?? 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
 },
};

export const sendEmail = async (data: EmailPayload) => {
    const transporter = nodemailer.createTransport(smtpOptions);
    
    return await transporter.sendMail({
        from: "localuser136@gmail.com",
        ...data,
    });
};