import nodemailer from "nodemailer";

export const sendSamleMail = async()=>{

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT as string) ?? 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.NEXTAUTH_URL,
        to: "suthardev1010@gmail.com",
        subject: 'Confirm your Email',
        text: `Click the following link to confirm your email:`,
        html: `<p>Click the following link to confirm your email:</p><a href="">Confirm Email</a>`,
      };

      await transporter.sendMail(mailOptions);
}