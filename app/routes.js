const express = require("express");
const router = express.Router();
const attractionController = require("../app/controllers/attractionController");
const authController = require("../app/controllers/authController");
const staticController = require("../app/controllers/staticController");
const commentController = require("../app/controllers/commentController");
const likeController = require("../app/controllers/likeController");
const authMiddleware = require("../app/authMiddleware");
const mailController = require("../app/controllers/mailController");

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

// Page d'accueil
router.get("/", staticController.homePage);

// Page de réservation
router.get("/reservation", staticController.contactPage);
router.post("/reservation", staticController.submitContactForm);

// Page de confidentialité
router.get("/privacy", staticController.privacyPage);

// Page mention légale
router.get("/legal", staticController.legalPage);

// Page des attractions
router.get("/attraction", attractionController.getAttractions);

// Détails d'une attraction
router.get("/attractionDetail/:id", attractionController.getAttractionDetails);

// Routes pour les commentaires
router.post("/addComment", commentController.addComment);
router.post("/updateComment/:id", commentController.updateComment);
router.post("/deleteComment/:id", commentController.deleteComment);

// Route pour ajouter les likes
router.post("/addLike", likeController.addLike);
// Route pour supprimer les likes
router.post("/deleteLike", likeController.deleteLike);
// Route pour basculer les likes
router.post("/toggleLike", likeController.toggleLike);

// Page de connexion
router.get("/login", (req, res) => res.render("login"));
router.post("/login", authController.login);

// Page d'inscription
router.get("/register", (req, res) => res.render("register"));
router.post("/register", authController.register);

// Déconnexion
router.get("/logout", authController.logout);

// Afficher le formulaire de récupération de mot de passe
router.get("/forgot-password", mailController.showForgotPasswordForm);

// Gérer la soumission de l'email pour la récupération de mot de passe
router.post("/forgot-password", mailController.handleForgotPassword);

// Afficher le formulaire de réinitialisation de mot de passe
router.get("/reset-password/:token", mailController.showResetPasswordForm);

// Gérer la réinitialisation de mot de passe
router.post("/reset-password/:token", mailController.handleResetPassword);

module.exports = router;
