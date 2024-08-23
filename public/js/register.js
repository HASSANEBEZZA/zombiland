document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger alert-dismissible fade show';
    errorMessage.role = 'alert';

    form.insertBefore(errorMessage, form.firstChild);
    errorMessage.style.display = 'none';

    function showError(message) {
        errorMessage.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        errorMessage.style.display = 'block';
    }

    form.addEventListener('submit', function (e) {
        errorMessage.style.display = 'none';

        if (!usernameInput.value || !emailInput.value || !confirmEmailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
            showError('Tous les champs sont requis.');
            e.preventDefault();
            return;
        }

        if (emailInput.value !== confirmEmailInput.value) {
            showError('Les adresses e-mail ne correspondent pas.');
            e.preventDefault();
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            showError('Les mots de passe ne correspondent pas.');
            e.preventDefault();
            return;
        }

        const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordStrength.test(passwordInput.value)) {
            showError('Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un symbole.');
            e.preventDefault();
        }
    });
});
