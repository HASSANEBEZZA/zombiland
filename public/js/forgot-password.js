document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgot-password-form');
    const emailError = document.getElementById('email-error');
    const loadingIndicator = document.getElementById('loading-indicator');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Réinitialiser les messages
        emailError.textContent = '';
        formMessage.textContent = '';
        
        const email = document.getElementById('email').value;
        
        // Afficher le chargement
        loadingIndicator.style.display = 'block';

        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();
            loadingIndicator.style.display = 'none';  // Cacher l'indicateur de chargement

            if (response.ok) {
                formMessage.textContent = "Un email de réinitialisation a été envoyé.";
                formMessage.classList.add('text-success');
            } else {
                emailError.textContent = result.message;
            }
        } catch (error) {
            console.error('Erreur:', error);
            formMessage.textContent = "Une erreur s'est produite. Veuillez réessayer plus tard.";
            formMessage.classList.add('text-danger');
            loadingIndicator.style.display = 'none';  // Cacher l'indicateur de chargement
        }
    });
});
