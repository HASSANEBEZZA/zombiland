
document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner le bouton et le menu
    const toggleButton = document.getElementById('navbarToggle');
    const navbarCollapse = document.getElementById('navbarNav');
    
    // Ajouter un gestionnaire d'événement au bouton
    toggleButton.addEventListener('click', function () {
        // Toggle la classe 'show' pour ouvrir/fermer le menu
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        } else {
            navbarCollapse.classList.add('show');
        }
    });
});

