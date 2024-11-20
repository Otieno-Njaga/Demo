// JavaScript to toggle the nav on smaller screens
document.getElementById('menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('nav');
    nav.classList.toggle('show'); // Toggle the 'show' class
});
