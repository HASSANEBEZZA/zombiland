const { Attraction, Comment, Like, User } = require("../models");

// Liste toutes les attractions
exports.getAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.findAll();

    // Vérification si des attractions ont été trouvées
    if (!attractions || attractions.length === 0) {
      return res.status(404).json({ success: false, message: "Aucune attraction trouvée." });
    }

    res.render("attraction", { attractions });
  } catch (error) {
    
    res.status(500).json({ success: false, message: "Erreur interne du serveur. Veuillez réessayer plus tard." });
  }
};

// l'affichage des détails d'une attraction avec ses commentaires et likes
exports.getAttractionDetails = async (req, res) => {
  const attractionId = req.params.id;
  const userId = req.session.userId; // Récupérez userId de la session

  try {
    const attraction = await Attraction.findByPk(attractionId, {
      include: [
        {
          model: Comment,
          as: "Comments",
          include: [{ model: User, as: "User" }],
        },
        {
          model: Like,
          as: "AttractionLikes",
          include: [{ model: User, as: "User" }],
        },
      ],
    });

    // Vérification si l'attraction existe
    if (!attraction) {
      return res.status(404).json({ success: false, message: "Attraction non trouvée." });
    }

    // Vérification si l'utilisateur a aimé cette attraction
    const userLiked = userId ? await Like.findOne({
      where: { user_id: userId, attraction_id: attractionId }
    }) : false;

    // Compter le nombre total de likes pour cette attraction
    const likeCount = await Like.count({
      where: { attraction_id: attractionId }
    });

    res.render("attractionDetail", {
      attraction,
      userId,
      userLiked: !!userLiked,
      likeCount
    });
  } catch (error) {
   
    res.status(500).json({ success: false, message: "Erreur interne du serveur. Veuillez réessayer plus tard." });
  }
};
