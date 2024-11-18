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


function addToFavorites(book) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some(favorite => favorite.title === book.title);

    if (isAlreadyFavorite) {
        alert(`${book.title} is already in your favorites.`);
        return;
    }

    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${book.title} has been added to your favorites!`);
}
