const express = require("express");
const router = express.Router();

// Importer les contrôleurs
const attractionController = require("../app/controllers/attractionController");
const authController = require("../app/controllers/authController");
const staticController = require("../app/controllers/staticController");
const commentController = require("../app/controllers/commentController");
const likeController = require("../app/controllers/likeController");
const passwordController = require("../app/controllers/passwordController");
const authMiddleware = require('../app/authMiddleware');
const reservationController = require('../app/controllers/reservationController');



// Routes statiques
router.get("/", staticController.homePage);
router.get("/privacy", staticController.privacyPage);
router.get("/legal", staticController.legalPage);


// Afficher la page de réservation
router.get('/reservation', reservationController.showReservationPage);

//  le formulaire de réservation
router.post('/reservation', reservationController.handleReservation);

module.exports = router;



// Route pour la page "À propos"
router.get('/apropos', staticController.aboutPage);
router.get('/cokies', (req, res) => res.render('cokies'));

// Routes attractions
router.get("/attraction", attractionController.getAttractions);
router.get("/attractionDetail/:id", attractionController.getAttractionDetails);

// Routes commentaires (avec authentification)
router.post("/addComment", authMiddleware, commentController.addComment);
router.post("/updateComment/:id", authMiddleware, commentController.updateComment);
router.post("/deleteComment/:id", authMiddleware, commentController.deleteComment);

// Routes likes (avec authentification)
router.post("/addLike", authMiddleware, likeController.addLike);
router.post("/deleteLike", authMiddleware, likeController.deleteLike);
router.post("/toggleLike", authMiddleware, likeController.toggleLike);

// Routes d'authentification
router.get("/login", authController.showLoginPage);
router.post("/login", authController.login);

router.get("/register", authController.showRegisterPage);
router.post("/register", authController.register);

router.get("/logout", authController.logout);

// Réinitialisation de mot de passe
router.get("/request-reset", passwordController.showRequestResetPage);
router.post("/request-reset", passwordController.requestPasswordReset);

// Routes modifiées pour réinitialisation de mot de passe
router.get("/change-password", passwordController.showChangePasswordPage);
router.post("/change-password", passwordController.resetPassword);

router.get('/notification', passwordController.showNotificationPage);

// Confirmation de l'email
router.get("/confirm-email", authController.confirmEmail);

module.exports = router;
