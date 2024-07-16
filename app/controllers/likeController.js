const { Like } = require("../models");

// Ajoute un like à une attraction
exports.addLike = async (req, res) => {
  const { attractionId } = req.body;
  const userId = req.user ? req.user.id : null;

  console.log("addLike called", { userId, attractionId });

  try {
    // Vérifier si l'utilisateur est authentifié
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Vérifier si l'utilisateur a déjà aimé cette attraction
    const existingLike = await Like.findOne({
      where: { user_id: userId, attraction_id: attractionId },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ error: "Vous avez déjà aimé cette attraction" });
    }

    // Créer un nouveau like
    await Like.create({ user_id: userId, attraction_id: attractionId });

    // Récupérer le nombre total de likes pour cette attraction
    const likeCount = await Like.count({
      where: { attraction_id: attractionId },
    });

    // Répondre avec le nombre total de likes mis à jour
    res.json({ likeCount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Supprime un like d'une attraction
exports.deleteLike = async (req, res) => {
  const { attractionId } = req.body;
  const userId = req.user ? req.user.id : null;

  try {
    // Vérifier si l'utilisateur est authentifié
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Rechercher le like à supprimer
    const like = await Like.findOne({
      where: { user_id: userId, attraction_id: attractionId },
    });

    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }

    // Supprimer le like
    await like.destroy();

    // Récupérer le nombre total de likes pour cette attraction
    const likeCount = await Like.count({
      where: { attraction_id: attractionId },
    });

    // Répondre avec le nombre total de likes mis à jour
    res.json({ likeCount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Bascule un like (ajoute ou supprime) pour une attraction
exports.toggleLike = async (req, res) => {
  const { attractionId } = req.body;
  const userId = req.user ? req.user.id : null;

  try {
    // Vérifier si l'utilisateur est authentifié
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Vérifier si l'utilisateur a déjà aimé cette attraction
    const existingLike = await Like.findOne({
      where: { user_id: userId, attraction_id: attractionId },
    });

    if (existingLike) {
      // Si le like existe déjà, le supprimer
      await existingLike.destroy();
    } else {
      // Sinon, créer un nouveau like
      await Like.create({ user_id: userId, attraction_id: attractionId });
    }

    // Récupérer le nombre total de likes pour cette attraction
    const likeCount = await Like.count({
      where: { attraction_id: attractionId },
    });

    // Répondre avec le nombre total de likes mis à jour
    res.json({ likeCount });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
