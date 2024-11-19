
document
  .getElementById("sign__up")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const username = document.getElementById("user__name").value;
    const email = document.getElementById("e__mail").value;
    const password = document.getElementById("pass__word").value;
    const confirmPassword = document.getElementById("confirm__password").value;

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare data to send
    const formData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      // Send POST request to the server
      const response = await fetch(
        "https://glad-lion-holy.ngrok-free.app/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        alert(response.message);
        // Redirect or perform further actions
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

  




// Login form submission handler
document
.getElementById("sign__in")
.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.querySelector('#sign__in input[type="email"]').value;
  const password = document.querySelector(
    '#sign__in input[type="password"]'
  ).value;
  const rememberMe = document.getElementById("remember-me").checked;

  const loginData = {
    email: email,
    password: password,
  };

  try {
    const res = await fetcher("auth/login", "POST", loginData);
    console.log(res);
    // Save username in localStorage and optionally handle remember me
    localStorage.setItem("loggedInUsername", res.userName);
    if (rememberMe) {
      localStorage.setItem("authToken", res.tokens.accessToken); // for persistent login
    }

     // Update UI with the username
    window.location.href = "/pages/user.html"; // Redirect or other actions
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});





