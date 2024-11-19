
// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function () {
    console.log("Logout button clicked"); // Debugging

    // Clear user session (example for localStorage)
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUsername');

    // Redirect to the login page
    window.location.href = '/admin/admin.html';
});

