document.addEventListener('DOMContentLoaded', () => {
    const likeButton = document.querySelector('.like-btn');
    const likeCountElement = document.getElementById('like-count');
    
    if (!likeButton) return;

    const attractionId = likeButton.getAttribute('data-attraction-id');
    let userLiked = likeButton.classList.contains('liked');

    console.log('Initial userLiked:', userLiked);

    const handleLikeToggle = (event) => {
        event.preventDefault();

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
                console.log('Toggled userLiked:', userLiked);
                likeCountElement.textContent = data.likeCount;
                likeButton.classList.toggle('liked', userLiked);
                likeButton.querySelector('.heart').classList.toggle('red-heart', userLiked);
            }
        })
        .catch(error => console.error('Erreur:', error));
    };

    // Détecter si l'utilisateur est sur un appareil mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Utiliser pointerdown pour les appareils mobiles et desktop
    likeButton.addEventListener('pointerdown', handleLikeToggle);
});
