import nodemailer from 'nodemailer';

export const sendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transport = nodemailer.createTransport({
    // service: 'gmail',
    // host: 'mail.teamrabbil.com',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // user: 'info@teamrabbil.com',
      // pass: '~sR4[bhaC[Qs',
      user: 'chymdasif7@gmail.com',
      pass: 'yhhcyrxamneojkpj',
      // tls: { rejectUnauthorized: false },
    },
  });

  let mailOptions = {
    from: 'Task Manger Asif <info@teamrabbil.com>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
    html: `<b>Node mailer powered by MD ASIF</b>`,
  };
  return await transport.sendMail(mailOptions);
}