const { Comment } = require("../models");

// l'ajoute d'un commentaire à une attraction
exports.addComment = async (req, res) => {
  const { userId, attractionId, comment } = req.body;
  try {
    await Comment.create({
      user_id: userId,
      attraction_id: attractionId,
      comment,
    });
    res.redirect(`/attractionDetail/${attractionId}`);
  } catch (error) {
   
    res.status(500).json({ success: false, message: "Erreur interne du serveur. Veuillez réessayer plus tard." });
  }
};

// Modifie un commentaire
exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { commentText } = req.body;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Commentaire non trouvé." });
    }
    comment.comment = commentText;
    await comment.save();
    res.redirect(`/attractionDetail/${comment.attraction_id}`);
  } catch (error) {
    
    res.status(500).json({ success: false, message: "Erreur interne du serveur. Veuillez réessayer plus tard." });
  }
};

// Supprime un commentaire
exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Commentaire non trouvé." });
    }
    await comment.destroy();
    res.redirect(`/attractionDetail/${comment.attraction_id}`);
  } catch (error) {
   
    res.status(500).json({ success: false, message: "Erreur interne du serveur. Veuillez réessayer plus tard." });
  }
};
