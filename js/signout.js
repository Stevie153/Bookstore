// Example logout function in auth.js
document.getElementById('logout-btn').addEventListener('click', function () {
    // Clear user session (example for localStorage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    
    // Optionally redirect to the login page
    window.location.href = './index.html';
  });