require("dotenv").config();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  const { username, email, confirmEmail, password, confirmPassword } = req.body;

  if (email !== confirmEmail) {
    return res.status(400).send("Les emails ne correspondent pas");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Les mots de passe ne correspondent pas");
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send("Le nom d'utilisateur est déjà pris");
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).send("L'email est déjà enregistré");
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hash });

    res.redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Connexion de l'utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Identifiants invalides");
    }

    req.session.userId = user.id; // Stocke l'ID de l'utilisateur dans la session

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET, // Utilise la clé JWT de l'environnement
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Fonction de déconnexion de l'utilisateur
exports.logout = (req, res) => {
  req.session.destroy(); // Détruit la session de l'utilisateur
  res.clearCookie("token");
  res.redirect("/");
};
