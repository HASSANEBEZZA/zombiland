const { Comment } = require("../models");

// Ajoute un commentaire à une attraction
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
    res.status(500).send("Internal Server Error");
  }
};

// Modifie un commentaire
exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { commentText } = req.body;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    comment.comment = commentText;
    await comment.save();
    res.redirect(`/attractionDetail/${comment.attraction_id}`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Supprime un commentaire
exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    await comment.destroy();
    res.redirect(`/attractionDetail/${comment.attraction_id}`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
