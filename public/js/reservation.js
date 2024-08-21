document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservation-form');
    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
    const modalMessageBody = document.getElementById('modal-message-body');
    const modalOkButton = document.getElementById('modal-ok-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse reçue:', data);

            // Afficher le message dans le modal
            modalMessageBody.textContent = data.message;

            // Afficher le modal
            messageModal.show();

            if (!data.error) {
                // Rediriger vers la page d'accueil lorsque l'utilisateur clique sur "OK"
                modalOkButton.addEventListener('click', () => {
                    window.location.href = '/';
                });
            } else {
                // Si c'est une erreur, ne pas rediriger
                modalOkButton.addEventListener('click', () => {
                    messageModal.hide();
                });
            }
        })
        .catch(error => {
            console.error('Erreur:', error);

            // Afficher un message d'erreur dans le modal
            modalMessageBody.textContent = 'Une erreur est survenue. Veuillez réessayer.';

            // Afficher le modal
            messageModal.show();

            // Ne pas rediriger en cas d'erreur
            modalOkButton.addEventListener('click', () => {
                messageModal.hide();
            });
        });
    });
});
