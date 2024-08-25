document.addEventListener('DOMContentLoaded', () => {
    const likeButton = document.querySelector('.like-btn');
    const likeCountElement = document.getElementById('like-count');
    
    if (!likeButton) return;

    const attractionId = likeButton.getAttribute('data-attraction-id');
    let userLiked = likeButton.classList.contains('liked');

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
                userLiked = !userLiked;
                likeCountElement.textContent = data.likeCount;
                likeButton.classList.toggle('liked', userLiked);
                likeButton.querySelector('.heart').classList.toggle('red-heart', userLiked);
            }
        })
        .catch(error => console.error('Erreur:', error));
    };

    // Ajout des écouteurs pour les événements "click" et "touchstart"
    likeButton.addEventListener('click', handleLikeToggle);
    likeButton.addEventListener('touchstart', handleLikeToggle);
});
