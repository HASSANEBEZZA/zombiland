
    document.addEventListener('DOMContentLoaded', function() {
        // Fonction pour afficher les messages
        function showMessage(type, message) {
            const messageContainer = document.getElementById('message-container');
            if (message) {
                messageContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
                // Afficher le message pendant 5 secondes
                setTimeout(function() {
                    messageContainer.innerHTML = '';
                }, 5000);
            }
        }

        // Récupérer les messages de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');
        const type = urlParams.get('type') || 'error'; // Définir 'error' comme type par défaut

        if (message) {
            showMessage(type, message);
        }
    });
