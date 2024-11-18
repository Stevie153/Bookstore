document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
});

// Load favorites dynamically
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesContainer = document.getElementById("favorites-items");
    const noFavoritesMessage = document.getElementById("no-favorites");

    favoritesContainer.innerHTML = ""; // Clear existing items

    if (favorites.length === 0) {
        noFavoritesMessage.style.display = "block";
        return;
    }

    noFavoritesMessage.style.display = "none";
    favorites.forEach((item, index) => {
        const favoriteItem = document.createElement("div");
        favoriteItem.classList.add("favorite-item");

        favoriteItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="favorite-item-details">
                <h3>${item.title}</h3>
                <button class="remove-btn" data-index="${index}">Remove from Favorites</button>
            </div>
        `;

        favoritesContainer.appendChild(favoriteItem);
    });

    addRemoveEventListeners();
}

// Add event listeners to remove buttons
function addRemoveEventListeners() {
    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {
        button.addEventListener("click", removeFavorite);
    });
}

// Remove a book from favorites
function removeFavorite(event) {
    const index = event.target.dataset.index;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
}


function updateFavoritesCounter() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.querySelector(".fas.fa-heart").innerHTML = `&nbsp;(${favorites.length})`;
}

// Call this function after adding or removing favorites
document.addEventListener("DOMContentLoaded", updateFavoritesCounter);
