// home bouton 

document.getElementById('reservation-button').addEventListener('mouseover', function() {
    if (!document.getElementById('reservation-message')) {
        const message = document.createElement('p');
        message.textContent = "Faites vite, les places sont limitées!";
        
        // Ajoutez des styles pour un fond vif et joueur
        message.style.color = 'black';
        message.style.backgroundColor = '#FFEB3B';  // Jaune vif pour le fond
        message.style.padding = '10px';
        message.style.borderRadius = '5px';
        message.style.marginTop = '10px';
        message.style.display = 'inline-block';
        message.style.fontWeight = 'bold';  // Texte en gras pour plus de dynamisme
        
        message.id = 'reservation-message';
        document.getElementById('message-container').appendChild(message);
    }
});

document.getElementById('reservation-button').addEventListener('mouseout', function() {
    const message = document.getElementById('reservation-message');
    if (message) {
        message.remove();
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');
    const closeButton = document.querySelector('.close-btn');

    // Fonction pour afficher la pop-up
    function showCookiePopup() {
        cookiePopup.style.display = 'block';
    }

    // Vérifiez si l'utilisateur a déjà accepté ou refusé les cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === null) {
        showCookiePopup();
    } else {
        // Cacher la pop-up si l'utilisateur a déjà fait un choix
        cookiePopup.style.display = 'none';
    }

    // Accepter les cookies
    acceptButton.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.style.display = 'none';
    });

    // Refuser les cookies
    declineButton.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'false');
        cookiePopup.style.display = 'none';
    });

    // Fermer la pop-up
    closeButton.addEventListener('click', function () {
        cookiePopup.style.display = 'none';
    });
});






// public/js/home.js

// home.js

document.addEventListener('DOMContentLoaded', function() {
    // Ce script est facultatif si les animations CSS suffisent
    // Vous pouvez ajouter des fonctionnalités JavaScript ici si nécessaire
});

// diapo 


// JavaScript pour le diaporama
let currentIndex = 0;
const slideshowWrapper = document.querySelector('.slideshow-wrapper');
const slideshowItems = document.querySelectorAll('.slideshow-item');
const totalItems = slideshowItems.length;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    const offset = -currentIndex * 100;
    slideshowWrapper.style.transform = `translateX(${offset}%)`;
}

setInterval(showNextSlide, 2000); // Changer d'image toutes les 2 secondes

// JavaScript pour gérer la pop-up de cookies si nécessaire
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('cookie-popup').style.display = 'none';
});

