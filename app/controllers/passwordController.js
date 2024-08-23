require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendResetEmail } = require('../config/serviceMail');
const { Op } = require('sequelize');

// Affichage de la page de demande de réinitialisation de mot de passe
exports.showRequestResetPage = (req, res) => {
    res.render("request-reset", {
        message: res.locals.message || null,
        error: res.locals.error || null
    });
};

// Demande de réinitialisation de mot de passe
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.error(`Aucun utilisateur trouvé avec l'email : ${email}`);
            res.cookie('error', 'Aucun utilisateur trouvé avec cette adresse e-mail.', { httpOnly: true });
            return res.redirect('/request-reset');
        }

        // Générer un token et une expiration
        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = new Date(Date.now() + 3600000); // 1 heure

        // Mettre à jour l'utilisateur avec le token et l'expiration
        user.resetToken = token;
        user.resetTokenExpiration = tokenExpiration;
        await user.save();

        const resetLink = `${process.env.BASE_URL}/change-password?token=${token}`;
        await sendResetEmail(email, resetLink);

       
        res.cookie('message', 'Un e-mail de réinitialisation a été envoyé à votre adresse.', { httpOnly: true });
        return res.redirect('/request-reset');
    } catch (error) {
        console.error(`Erreur lors de la demande de réinitialisation : ${error.message}`);
        res.cookie('error', 'Erreur lors de la demande de réinitialisation. Veuillez réessayer plus tard.', { httpOnly: true });
        return res.redirect('/request-reset');
    }
};

// Affichage de la page de changement de mot de passe
exports.showChangePasswordPage = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        console.error('Token manquant');
        return res.redirect('/notification?message=Token manquant ou invalide.&type=error');
    }

    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: {
                    [Op.gt]: new Date() // Vérifie que le token n'est pas expiré
                }
            }
        });

        if (!user) {
            console.error('Session expirée ou token invalide');
            return res.redirect('/notification?message=Session expirée ou token invalide.&type=error');
        }

        res.render("changePassword", {
            token,
            message: req.query.message || null,
            error: req.query.error || null
        });
    } catch (error) {
        console.error(`Erreur lors de l'affichage de la page de changement de mot de passe : ${error.message}`);
        return res.redirect('/notification?message=Erreur du serveur. Veuillez réessayer plus tard.&type=error');
    }
};

// Réinitialisation du mot de passe
exports.resetPassword = async (req, res) => {
    const { token, password, confirmPassword } = req.body;

    if (!token) {
        console.error('Aucun token fourni');
        return res.redirect('/notification?message=Aucun token fourni.&type=error');
    }

    try {
        // Vérification des conditions du mot de passe
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(password)) {
            console.error('Le mot de passe ne respecte pas les critères');
            return res.redirect(`/change-password?token=${token}&message=Le mot de passe doit comporter au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial.&type=error`);
        }

        // Vérifier si les mots de passe correspondent
        if (password !== confirmPassword) {
            console.error('Les mots de passe ne correspondent pas');
            return res.redirect(`/change-password?token=${token}&message=Les mots de passe ne correspondent pas.&type=error`);
        }

        // Trouver l'utilisateur par le token et vérifier son expiration
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: {
                    [Op.gt]: new Date() // Vérifie que le token n'est pas expiré
                }
            }
        });

        if (!user) {
            console.error('Token invalide ou expiré');
            return res.redirect('/notification?message=Token invalide ou expiré.&type=error');
        }

        // Hachage du nouveau mot de passe et sauvegarde
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
        user.resetToken = null;
        user.resetTokenExpiration = null; // Réinitialiser le token et son expiration après l'utilisation
        await user.save();

       
        return res.redirect('/notification?message=Mot de passe réinitialisé avec succès.&type=success'); // Redirige vers la page de notification avec un message de succès
    } catch (error) {
        console.error(`Erreur lors de la réinitialisation du mot de passe : ${error.message}`);
        return res.redirect('/notification?message=Erreur du serveur. Veuillez réessayer plus tard.&type=error');
    }
};

// Affichage des notifications
exports.showNotificationPage = (req, res) => {
    // Extraire le message et le type depuis les query params
    const { message = 'Une erreur est survenue.', type = 'error' } = req.query;

    // Rendre la vue avec le message et le type
    res.render('notification', {
        message,
        type
    });
};
