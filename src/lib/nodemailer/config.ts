
import nodemailer from 'nodemailer';

  // let transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT),
  //   secure: process.env.SMTP_SECURE === 'true',
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
 export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});



// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     const { email } = req.body;

//     if (!email) {
//       res.status(400).json({ error: 'Email is required' });
//       return;
//     }

//     // Generate verification token
//     const verificationToken = crypto.randomBytes(32).toString('hex');

//     // Save the verification token in the database or another storage
//     // Example: await saveVerificationToken(email, verificationToken);

//     await sendVerificationEmail(email, verificationToken);

//     res.status(201).json({ message: 'User registered successfully, verification email sent' });
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
