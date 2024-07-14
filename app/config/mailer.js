const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendEmail = async (name, email, message, age, recipientNumber) => {
  try {
    const mailContent = `
      Nom Complet: ${name}
      Âge: ${age}
      Numéro de Téléphone: ${recipientNumber}
      Adresse E-mail: ${email}
      
      Message:
      ${message}
    `;

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "zombielandparc@gmail.com",
      subject: "Nouvelle soumission de formulaire de contact",
      text: mailContent,
    });

    return true;
  } catch (error) {
    return false;
  }
};
