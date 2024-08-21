require("dotenv").config();
const nodemailer = require('nodemailer');

// Création d un transporteur SMTP avec Brevo
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Hôte SMTP de Brevo
    port: 587, // Port SMTP
    auth: {
        user: process.env.BREVO_EMAIL_USER, // mon e-mail Brevo
        pass: process.env.BREVO_EMAIL_PASS  // Clé API  Brevo
    }
});

// Envoi d'un e-mail de confirmation d'inscription
const sendConfirmationEmail = async (email, confirmationLink) => {
    const mailOptions = {
        from: process.env.BREVO_EMAIL_USER_user, // Adresse e-mail de l'expéditeur
        to: email,
        subject: 'Confirmation de votre compte',
        html: `
            <h1>Confirmez votre compte</h1>
            <p>Veuillez cliquer sur le lien ci-dessous pour confirmer votre compte :</p>
            <a href="${confirmationLink}">Confirmer mon compte</a>
            <p>Merci !</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        
        throw new Error('Erreur lors de l\'envoi de l\'e-mail.');
    }
};

// Envoi d'un e-mail pour la réinitialisation de mot de passe
const sendResetEmail = async (email, resetLink) => {
    const mailOptions = {
        from: process.env.BREVO_EMAIL_USER_user, // Adresse e-mail de l'expéditeur
        to: email,
        subject: 'Réinitialisation de mot de passe',
        html: `
            <h1>Réinitialisation de mot de passe</h1>
            <p>Vous avez demandé une réinitialisation de mot de passe. Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
            <a href="${resetLink}">Réinitialiser mon mot de passe</a>
            <p>Merci !</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
       
    } catch (error) {
       
        throw new Error('Erreur lors de l\'envoi de l\'e-mail.');
    }
};
// reservation mail 
const sendReservationEmail = async (reservationDetails) => {
    const mailOptions = {
        from: process.env.BREVO_EMAIL_USER_user, // Adresse e-mail de l'expéditeur
        to: process.env.BREVO_RECIPIENT_EMAIL, // m'adresse e-mail 
        subject: 'Nouvelle Réservation Reçue',
        html: `
            <h1>Nouvelle Réservation</h1>
            <p><strong>Nom Complet:</strong> ${reservationDetails.name}</p>
            <p><strong>Âge:</strong> ${reservationDetails.age}</p>
            <p><strong>Numéro de Téléphone:</strong> ${reservationDetails.recipientNumber}</p>
            <p><strong>Adresse E-mail:</strong> ${reservationDetails.email}</p>
            <p><strong>Date de Réservation:</strong> ${reservationDetails.date}</p>
            <p><strong>Nombre de Places:</strong> ${reservationDetails.seats}</p>
            <p><strong>Message:</strong></p>
            <p>${reservationDetails.message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
      
    } catch (error) {
        
        throw new Error('Erreur lors de l\'envoi de l\'e-mail.');
    }
};

// Exportez toutes les fonctions que vous souhaitez utiliser ailleurs
module.exports = { sendConfirmationEmail, sendResetEmail, sendReservationEmail };
