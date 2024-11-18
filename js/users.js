


// Function to display the logged-in user's name
function displayUsername() {
  const username = localStorage.getItem('loggedInUsername');
  const userNameDisplay = document.getElementById('user-name-display');
  console.log(userNameDisplay);

  if (username) {
      userNameDisplay.textContent = ` Hi, ${username}`;
      userNameDisplay.style.display = 'inline'; // Show the username
  } else {
      userNameDisplay.style.display = 'none'; // Hide if not logged in
  }
}


// On page load, display username if logged in
window.onload = function() {
  displayUsername();
};
