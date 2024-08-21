document.addEventListener('DOMContentLoaded', () => {
    const likeButton = document.querySelector('.like-btn');
    const likeCountElement = document.getElementById('like-count');
    const attractionId = likeButton.getAttribute('data-attraction-id');
    let userLiked = likeButton.classList.contains('liked');

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
    if (likeButton) {
        likeButton.addEventListener('click', handleLikeToggle);
    }
});
