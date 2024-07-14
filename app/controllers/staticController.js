// Importez la fonction sendEmail depuis le fichier mailer.js
const { sendEmail } = require("../config/mailer");

class StaticController {
  // Méthode pour rendre la page d'accueil
  homePage(req, res) {
    // Rendu de la vue "home"
    res.render("home");
  }

  // Méthode pour rendre la page de connexion
  loginPage(req, res) {
    // Rendu de la vue "login"
    res.render("login");
  }

  // Méthode pour rendre la page d'inscription
  registerPage(req, res) {
    // Rendu de la vue "register"
    res.render("register");
  }

  // Méthode pour rendre la page de politique de confidentialité
  privacyPage(req, res) {
    // Rendu de la vue "privacy"
    res.render("privacy");
  }

  // Méthode pour rendre la page des mentions légales
  legalPage(req, res) {
    // Rendu de la vue "legal"
    res.render("legal");
  }

  // Méthode pour rendre la page de contact
  contactPage(req, res) {
    // Rendu de la vue "contact"
    res.render("reservation");
  }

  // Méthode pour soumettre le formulaire de reservations
  async submitContactForm(req, res) {
    const { name, age, recipientNumber, email, message } = req.body;

    try {
      // Appel à la fonction sendEmail avec les données du formulaire
      const emailSent = await sendEmail(
        name,
        email,
        message,
        age,
        recipientNumber
      );

      if (emailSent) {
        res.send(
          `Merci ${name} pour votre message ! Nous reviendrons vers vous bientôt.`
        );
      } else {
        throw new Error("Échec de l'envoi de l'e-mail");
      }
    } catch (error) {
      res
        .status(500)
        .send("Échec de l'envoi de l'e-mail. Veuillez réessayer plus tard.");
    }
  }
}

// Exportez une instance de votre contrôleur
module.exports = new StaticController();
