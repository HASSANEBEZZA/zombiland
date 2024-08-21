// JavaScript pour la navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarList = document.querySelector('.navbar-list');

    if (navbarToggle && navbarList) {
        navbarToggle.addEventListener('click', function() {
            navbarList.classList.toggle('active');
        });
    }
});

