document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('back-to-top');

    // Affiche le bouton lorsque l'utilisateur fait défiler la page vers le bas
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) { // Ajustez la valeur pour définir quand le bouton doit apparaître
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Ajoute un comportement de défilement vers le haut lorsque le bouton est cliqué
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
