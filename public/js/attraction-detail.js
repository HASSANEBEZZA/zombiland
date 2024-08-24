document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne le bouton de like et le compteur de likes
    const likeButton = document.querySelector('.like-btn');
    const likeCountElement = document.getElementById('like-count');
    
    if (!likeButton) return; // Assurez-vous que le bouton existe avant de continuer

    // Récupère l'ID de l'attraction depuis le bouton
    const attractionId = likeButton.getAttribute('data-attraction-id');
    let userLiked = likeButton.classList.contains('liked'); // Vérifie si l'utilisateur a déjà liké

    // Fonction pour gérer le clic sur le bouton de like
    const handleLikeToggle = () => {
        fetch('/toggleLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ attractionId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Erreur:', data.error);
            } else {
                // Met à jour le compteur de likes
                likeCountElement.textContent = data.likeCount;
                // Bascule l'état du bouton de like
                userLiked = !userLiked;
                likeButton.classList.toggle('liked', userLiked);
                likeButton.querySelector('.heart').classList.toggle('red-heart', userLiked);
            }
        })
        .catch(error => console.error('Erreur:', error));
    };

    // Ajoute un écouteur d'événement pour le clic sur le bouton de like
    likeButton.addEventListener('click', handleLikeToggle);
});
