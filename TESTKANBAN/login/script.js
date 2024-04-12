document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Show the navigation bar
    document.getElementById('navbar').style.display = 'block';
});
