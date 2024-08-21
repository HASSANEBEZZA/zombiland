document.addEventListener("DOMContentLoaded", function() {
    const messageContainer = document.getElementById('message-container');
    const loginButtonContainer = document.getElementById('login-button-container');

    // Fonction pour lire les cookies
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Lire les cookies pour les messages
    const successMessage = getCookie('message');
    const errorMessage = getCookie('error');

    if (successMessage) {
        messageContainer.innerHTML = `<div class="alert alert-success">${successMessage}</div>`;
        loginButtonContainer.style.display = 'block'; // Afficher le bouton de connexion
        document.cookie = "message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Effacer le cookie après l'affichage
    }

    if (errorMessage) {
        messageContainer.innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`;
        document.cookie = "error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Effacer le cookie après l'affichage
    }
});
