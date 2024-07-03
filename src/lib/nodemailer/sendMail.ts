import { transporter } from "./config";
import fs from "fs";
import path from "path";
const loadMessages = (language: string) => {
  const messagesPath = path.join(process.cwd(), `messages/${language}.json`);
  return JSON.parse(fs.readFileSync(messagesPath, "utf8"));
};



export async function sendVerificationEmail(
  userEmail: string,
  verificationUrl: string,
  userLanguage: string,
  verificationCode:string
) {
  const messages = loadMessages(userLanguage);
  const templatePath = path.join(
    process.cwd(),
    `templates/verify-email-${userLanguage}.html`
  );

  let template = fs.readFileSync(templatePath, "utf8");
  template = template.replace("{{verificationLink}}", verificationUrl);
  template = template.replace("{{verificationCode}}", verificationCode); 

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: messages.verifyEmailSubject,
    html: template,
    // attachments: [
    //   {
    //     filename: "AppLogo.svg",
    //     path: path.join(__dirname, '../../../public/assets/logos/Applogo.svg'),
    //     cid: "logo",
    //   },
    // ],
  };

  await transporter.sendMail(mailOptions);
}
