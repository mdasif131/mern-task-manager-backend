import nodemailer from 'nodemailer';

export const sendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'chymdasif7@gmail.com',
      pass: 'yhhcyrxamneojkpj',
    },
  });

  let mailOptions = {
    from: 'Task Manger Asif <chymdasif7@gmail.com>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
    html: `<b>Node mailer powered by MD ASIF</b>`,
  };
  return await transport.sendMail(mailOptions);
}