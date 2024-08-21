document.addEventListener('DOMContentLoaded', function () {
    const acceptButton = document.getElementById('acceptCookies');
    const refuseButton = document.getElementById('refuseCookies');
    const closeButton = document.getElementById('closeButton');

    // Fonction pour rediriger vers la page d'accueil
    function redirectToHome() {
        window.location.href = '/';
    }

    // Accepter les cookies
    if (acceptButton) {
        acceptButton.addEventListener('click', function () {
            localStorage.setItem('cookiesAccepted', 'true');
            redirectToHome();
        });
    }

    // Refuser les cookies
    if (refuseButton) {
        refuseButton.addEventListener('click', function () {
            localStorage.setItem('cookiesAccepted', 'false');
            redirectToHome();
        });
    }

    // Fermer la pop-up
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            redirectToHome();
        });
    }
});
