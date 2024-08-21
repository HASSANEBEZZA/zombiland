require('dotenv').config();
const { sendReservationEmail } = require('../config/serviceMail');

exports.showReservationPage = (req, res) => {

    res.render('reservation', {
        message: res.locals.message || '',
        error: res.locals.error || false
    });
};

exports.handleReservation = async (req, res) => {
  

    const { name, age, recipientNumber, email, message, date, seats } = req.body;

    if (!name || !email || !message || !recipientNumber || !date || !seats) {
  
        return res.json({
            message: "Tous les champs sont requis.",
            error: true
        });
    }

    try {
     

        const reservationDetails = {
            name,
            age: age || 'Non spécifié',
            recipientNumber,
            email,
            date,
            seats,
            message
        };

        // Appel de la fonction pour envoyer l'email
        await sendReservationEmail(reservationDetails);

      
        res.json({
            message: "Votre réservation a été envoyée avec succès. Vous serez contacté sous peu.",
            error: false
        });

    } catch (error) {
   
        res.json({
            message: "Erreur du serveur. Veuillez réessayer plus tard.",
            error: true
        });
    }
};
