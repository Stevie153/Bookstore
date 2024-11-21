async function loadCategory() {
    const categoryList = document.getElementById("dynamicCategoryList"); // Target the category list element

    try {
        // Fetch categories from the API
        const response = await fetch(
            "https://glad-lion-holy.ngrok-free.app/api/categories/all?pageNumber=1&pageSize=100",
            {
                headers: { "ngrok-skip-browser-warning": true }, // Custom header to bypass warnings
            }
        );

        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json(); // Parse JSON response

        // Clear the list before adding new categories
        categoryList.innerHTML = "";

        // Default "All Books" option
        const allBooksItem = document.createElement("li");
        allBooksItem.innerHTML = `<a href="#" onclick="loadBooks()">All Books</a>`;
        categoryList.appendChild(allBooksItem);

        // Loop through categories and append to the list
        data.data.items.forEach((category) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="#" onclick="loadBooks('${category}')">${category}</a>`;
            categoryList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
        categoryList.innerHTML = "<li>Error loading categories.</li>"; // Display error message
    }
}
async function loadBooks(category = "all books", sortOrder = "default") {
    const booksContainer = document.getElementById("featuredcontainer"); // Target the books container
    const resultsCount = document.getElementById("resultsCount"); // Target results count text

    // Ensure category is a string, defaulting to "all books" if undefined
    const currentCategory = category || "all books";

    // Update the breadcrumb title dynamically based on the category
    const breadcrumbTitle = document.getElementById("breadcrumb-title");
    if (breadcrumbTitle) {
        breadcrumbTitle.innerText = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1); // Capitalize the first letter
    } else {
        console.warn("Breadcrumb title element not found.");
    }

    // Update the breadcrumb trail for better navigation
    const breadcrumbTrail = document.getElementById("breadcrumb-trail");
    if (breadcrumbTrail) {
        breadcrumbTrail.innerHTML = `
            <a href="#" onclick="loadBooks()">All Books</a> &gt; 
            <span>${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}</span>
        `;
    } else {
        console.warn("Breadcrumb trail element not found.");
    }

    try {
        // Determine the API endpoint based on the category
        const apiUrl = currentCategory !== "all books"
            ? `https://glad-lion-holy.ngrok-free.app/api/books/categories?category=${currentCategory}&pageNumber=1&pageSize=100`
            : "https://glad-lion-holy.ngrok-free.app/api/books/all?pageNumber=1&pageSize=100";

        // Fetch books from the API
        const response = await fetch(apiUrl, {
            headers: { "ngrok-skip-browser-warning": true }, // Custom header to bypass warnings
        });

        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json(); // Parse JSON response

        // Clear the container before adding new books
        booksContainer.innerHTML = "";

        // Check if no results were found
        if (data.data.items.length === 0) {
            resultsCount.textContent = `No results found for "${currentCategory}"`;
            booksContainer.innerHTML = "<p>No books available for this category. Please try another.</p>";
            return;
        }

        // Update results count
        resultsCount.textContent = currentCategory
            ? `Showing ${data.data.items.length} results for "${currentCategory}"`
            : `Showing ${data.data.items.length} results`;

        // Sort books based on the selected sort order
        let books = data.data.items;
        if (sortOrder === "price-low-to-high") {
            books.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "price-high-to-low") {
            books.sort((a, b) => b.price - a.price);
        }

        // Loop through books and append to the container
        books.forEach((book) => {
            const bookItem = `
                <div class="book-card">
                    <div class="book-card-opt">
                        <img src="${book.bookImgUrl}" alt="${book.title}" class="book-image">
                        <h3>${book.title}</h3>
                        <p class="long-text">${book.author}</p>
                        <p>${book.categories.join(", ")}</p>
                        <p>Price: $${book.price.toFixed(2)}</p>
                    </div>
                    <div class="book-card-options">
                        <div class="book-actions">
                            <a href="javascript:void(0)" onclick="navigateToBook('${book.id}')" class="btn">
                                <i class="fas fa-info-circle"></i>
                            </a>
                            <a href="javascript:void(0)" onclick="addToWishlist('${book.id}')" class="btn">
                                <i class="fas fa-heart"></i>
                            </a>
                            <a href="javascript:void(0)" onclick="addToCart('${book.id}')" class="btn">
                                <i class="fas fa-shopping-cart"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            booksContainer.insertAdjacentHTML("beforeend", bookItem);
        });
    } catch (error) {
        console.error("Error loading books:", error);
        booksContainer.innerHTML = "<p>Error loading books. Please try again later.</p>"; // Display error message
    }
}


// Add event listener for sorting dropdown
document.getElementById("sort-dropdown").addEventListener("change", (event) => {
    const sortOrder = event.target.value; // Get selected sort order
    const currentCategory = document.querySelector(".category-list .active")?.textContent || ""; // Get current category
    loadBooks(currentCategory, sortOrder); // Reload books with selected sort order
});

// Call the function to load books when the page loads (default category and sort order)
document.addEventListener("DOMContentLoaded", () => loadBooks());


// Example navigation and action functions (you can implement these as needed)
function navigateToBook(bookId) {
    console.log("Navigating to book ID:", bookId);
  // Navigate to the book details page with the bookId as a query parameter
  window.location.href = `/pages/product.html?bookId=${bookId}`;
}

function addToWishlist(bookId) {
    console.log(`Adding book ID: ${bookId} to wishlist`);
    // Implement wishlist logic here
}

function addToCart(bookId) {
    console.log(`Adding book ID: ${bookId} to cart`);
    // Implement cart logic here
}

// Call the function to load categories when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadCategory();
    loadBooks(); // Load all books by default
});
