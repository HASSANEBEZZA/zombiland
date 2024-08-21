$(document).ready(function() {
    $('#login-form').on('submit', function(event) {
        // Réinitialiser les messages d'erreur
        $('#form-message').text('');

        // Récupérer les valeurs du formulaire
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        // Validation côté client
        if (username === '' || password === '') {
            $('#form-message').text('Tous les champs sont requis.');
            event.preventDefault(); // Empêcher l'envoi du formulaire
            return;
        }

        // Optionnel: Validation supplémentaire (format du nom d'utilisateur, longueur du mot de passe, etc.)
        if (username.length < 3) {
            $('#form-message').text('Le nom d\'utilisateur doit comporter au moins 3 caractères.');
            event.preventDefault(); // Empêcher l'envoi du formulaire
            return;
        }

        if (password.length < 6) {
            $('#form-message').text('Le mot de passe doit comporter au moins 6 caractères.');
            event.preventDefault(); // Empêcher l'envoi du formulaire
            return;
        }
    });
});
