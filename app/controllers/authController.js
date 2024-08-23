require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendConfirmationEmail } = require('../config/serviceMail');

// Affichage la page de connexion
exports.showLoginPage = (req, res) => {
    
    res.render('login', { 
        message: res.locals.message || '', 
        error: res.locals.error || false 
    });
};

// Affichage la page d'inscription
exports.showRegisterPage = (req, res) => {
   
    res.render('register', {
        message: res.locals.message || '',
        error: res.locals.error || false,
        username: req.cookies.username || '',
        email: req.cookies.email || '',
        confirmEmail: req.cookies.confirmEmail || ''
    });
};

// Connexion
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      
      return res.render('login', {
          message: 'Tous les champs sont requis.',
          error: true
      });
  }

  try {
      

      // Rechercher l'utilisateur par e-mail 
      const user = await User.findOne({
          where: { email: username } // Utilisation de  `email` 
      });

      if (!user) {
          
          return res.render('login', {
              message: 'Nom d\'utilisateur ou mot de passe incorrect.',
              error: true
          });
      }

      

      // Comparation dee mot de passe fourni avec le hash stocké
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
          
          return res.render('login', {
              message: 'Nom d\'utilisateur ou mot de passe incorrect.',
              error: true
          });
      }

      // Vérification si l'utilisateur est confirmé
      if (!user.confirmed) {
        
          return res.render('login', {
              message: "Veuillez confirmer votre adresse e-mail avant de vous connecter.",
              error: true
          });
      }

      // Connexion réussie
      req.session.userId = user.id;
      req.session.username = user.username;


      res.redirect('/');

  } catch (error) {
     
      res.render('login', {
          message: "Erreur du serveur. Veuillez réessayer plus tard.",
          error: true
      });
  }
};

// Inscription
exports.register = async (req, res) => {
    const { username, email, confirmEmail, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmEmail || !confirmPassword) {
        return res.render('register', {
            message: "Tous les champs sont requis.",
            error: true,
            username,
            email,
            confirmEmail
        });
    }

    if (email !== confirmEmail) {
        return res.render('register', {
            message: "Les adresses e-mail ne correspondent pas.",
            error: true,
            username,
            email,
            confirmEmail
        });
    }

    if (password !== confirmPassword) {
        return res.render('register', {
            message: "Les mots de passe ne correspondent pas.",
            error: true,
            username,
            email,
            confirmEmail
        });
    }

    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordStrength.test(password)) {
        return res.render('register', {
            message: 'Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un symbole.',
            error: true,
            username,
            email,
            confirmEmail
        });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.render('register', {
                message: "Le nom d'utilisateur est déjà pris.",
                error: true,
                username,
                email,
                confirmEmail
            });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.render('register', {
                message: "L'adresse e-mail est déjà utilisée.",
                error: true,
                username,
                email,
                confirmEmail
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(20).toString('hex');
        const confirmationLink = `${process.env.BASE_URL}/confirm-email?token=${token}`;

        await User.create({
            username,
            email,
            password: hash,
            confirmed: false,
            confirmationToken: token
        });

        await sendConfirmationEmail(email, confirmationLink);

        res.render('register', {
            message: "Finalisez votre inscription, un e-mail de vous être envoyé : pour finaliser votre inscription, rendez-vous dans votre boîte e-mail pour activer votre compte."
        });

    } catch (error) {
        res.render('register', {
            message: "Erreur du serveur. Veuillez réessayer plus tard.",
            error: true,
            username,
            email,
            confirmEmail
        });
    }
};

// Déconnexion
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
           
            return res.redirect('/');  // Redirection vers la page d'accueil en cas d'erreur
        }
       
        res.redirect('/login');
    });
};

// Confirmation d'email

exports.confirmEmail = async (req, res) => {
    const { token } = req.query;

    try {
       
        const user = await User.findOne({ where: { confirmationToken: token } });

        if (!user) {
           
            return res.render('notification', { message: "Session exipré.", type: 'danger' });

        }

        // Vérifier si le token a expiré
        const tokenExpiration = new Date(user.createdAt.getTime() + 3600000); // Supposons que le token expire après 1 heure
        if (new Date() > tokenExpiration) {
          
            return res.render('notification', { message: "Session exipré.", type: 'danger' });
        }

        user.confirmed = true;
        user.confirmationToken = null;
        await user.save();

       
        res.render('notification', { message: "Votre compte a été confirmé avec succès. Vous pouvez maintenant vous connecter.", type: 'success' });

    } catch (error) {
       
        res.render('notification', { message: "Erreur du serveur. Veuillez réessayer plus tard.", type: 'danger' });
    }
};
