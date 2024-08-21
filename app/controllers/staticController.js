// Import de la  la fonction sendEmail depuis le fichier mailer.js
const path = require("path");
const { Attraction } = require('../models'); 

class StaticController {
  // Méthode pour rendre la page d'accueil
  async homePage(req, res) {
    try {
      // Récupérez toutes les attractions avec leurs images
      const attractions = await Attraction.findAll();
      
      // Passez les données des attractions à la vue
      res.render('home', { attractions });
    } catch (error) {

      res.status(500).send("Erreur serveur");
    }
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

// page a propos 
aboutPage = (req, res) => {
  res.render('apropos');
};


 
}

// Exportez une instance de votre contrôleur
module.exports = new StaticController();
