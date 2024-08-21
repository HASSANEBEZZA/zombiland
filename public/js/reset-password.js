document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('reset-password-form');
    const loadingIndicator = document.getElementById('loading-indicator');
    const formMessage = document.getElementById('form-message');

    // Fonction pour lire les cookies
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Affichage des messages depuis les cookies
    const successMessage = getCookie('message');
    const errorMessage = getCookie('error');
    
    if (successMessage) {
        formMessage.innerHTML = `<div class="alert alert-success">${successMessage}</div>`;
        document.cookie = "message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Effacer le cookie après l'affichage
    }
    
    if (errorMessage) {
        formMessage.innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`;
        document.cookie = "error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Effacer le cookie après l'affichage
    }

    // Afficher l'indicateur de chargement lors de la soumission du formulaire
    form.addEventListener('submit', function() {
        loadingIndicator.style.display = 'block';
    });
});
