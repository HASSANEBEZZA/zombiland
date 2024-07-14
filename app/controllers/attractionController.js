const { Attraction, Comment, Like, User } = require("../models");

// Liste toutes les attractions
exports.getAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.findAll();
    res.render("attraction", { attractions });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Affiche les détails d'une attraction avec ses commentaires et likes
exports.getAttractionDetails = async (req, res) => {
  const attractionId = req.params.id;

  try {
    // on Suppose qu'on récupérez userId à partir de la session
    const userId = req.session.userId;

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

    if (!attraction) {
      return res.status(404).send("Attraction not found");
    }

    res.render("attractionDetail", { attraction, userId });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
