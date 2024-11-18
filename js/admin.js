const fetcher = async(url,method="GET",body)=>
    {
        const baseUrl = 'https://glad-lion-holy.ngrok-free.app/api'
        try {
            // Send POST request to the server
            const response = await fetch(`${baseUrl}/${url}`, {
                method: method,            
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: body? JSON.stringify(body):null
            });
    
            // Check for successful response
            if (response.ok) {
                const data = await response.json();
              
                //alert(data.message);
                return data.data;
            
                // Redirect or perform further actions
            } else {
                const errorData = await response.json();
                alert("Error: " + errorData.message);
                throw errorData;	
    
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
            throw error;
        }
    }
    



// Event listener for login form submission
document.getElementById("sign__in").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const email = document.querySelector('#sign__in-email').value; // Get email
    const password = document.querySelector('#sign__in-password').value; // Get password

    const loginData = {
        email: email,
        password: password
    };

    try {
        // Call the fetcher function to perform the login
        const response = await fetcher("auth/login", "POST", loginData);

        // Check if the login was successful and store the token
        if (response && response.tokens && response.tokens.accessToken) {
            const { userName, tokens, userRole } = response;

            // Store the user data and access token in localStorage
            localStorage.setItem("loggedInUsername", userName);
            localStorage.setItem("authToken", tokens.accessToken);
            localStorage.setItem("userRole", userRole);

            // Optionally redirect to the dashboard or other page
            window.location.href = "../admin/dashboard.html"; // Redirect to user dashboard
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
    }
});


