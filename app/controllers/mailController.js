const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SibApiV3Sdk } = require("../config/brevoConfig");

// Afficher le formulaire de récupération de mot de passe
exports.showForgotPasswordForm = (req, res) => {
  res.render("forgotPassword");
};

// Gérer la soumission de l'email pour la récupération de mot de passe
exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).render("404");
    }

    // Générer un token de réinitialisation
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Envoyer l'email de réinitialisation via Brevo (Sendinblue)
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: user.email }];
    sendSmtpEmail.sender = {
      email: process.env.EMAIL_SENDER,
      name: "Your Name or Company",
    };
    sendSmtpEmail.subject = "Password Reset";
    sendSmtpEmail.htmlContent =
      `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>` +
      `<p>Please click on the following link, or paste this into your browser to complete the process:</p>` +
      `<p><a href="http://${req.headers.host}/reset-password/${resetToken}">Reset Password</a></p>` +
      `<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

      res.send(
        `An email has been sent to ${user.email} with further instructions.`
      );
    } catch (error) {
      throw error;
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Afficher le formulaire de réinitialisation de mot de passe
exports.showResetPasswordForm = (req, res) => {
  const { token } = req.params;
  res.render("resetPassword", { token });
};

// Gérer la réinitialisation de mot de passe
exports.handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).render("404");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).render("404");
    }

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
