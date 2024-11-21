// Extract `bookId` from the URL query parameters
function getBookId() {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("bookId");
  console.log("Extracted bookId:", bookId);  // Debugging log
  return bookId;
}

// Fetch book details by `bookId`
async function fetchBookDetails(bookId) {
  const apiUrl = `https://glad-lion-holy.ngrok-free.app/api/books/${bookId}`;
  const headers = { "ngrok-skip-browser-warning": true };

  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched book data:", data);  // Log the API response
    renderBookDetails(data.data);

    // Fetch related products based on categories after fetching book details
    fetchRelatedProducts(data.data.categories);
  } catch (error) {
    console.error("Error fetching book details:", error);
    document.querySelector(".product-details").innerHTML = `
      <p>Sorry, we couldn't load the book details. Please try again later.</p>`;
  }
}

// Render book details to the DOM
function renderBookDetails(book) {
  const breadcrumbTitle = document.getElementById("breadcrumb-title");
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productAuthor = document.getElementById("product-author");
  const productCategories = document.getElementById("product-categories");
  const productPrice = document.getElementById("product-price");
  const productDescription = document.getElementById("product-description");

  // Check if elements exist
  console.log("Breadcrumb Title:", breadcrumbTitle);
  console.log("Product Image:", productImage);
  console.log("Product Title:", productTitle);

  if (breadcrumbTitle) breadcrumbTitle.innerText = book.title;
  if (productImage) productImage.src = book.bookImgUrl;
  if (productTitle) productTitle.innerText = book.title;
  if (productAuthor) productAuthor.innerText = book.author;
  if (productCategories) productCategories.innerText = book.categories.join(", ");
  if (productPrice) productPrice.innerText = `$${book.price.toFixed(2)}`;
  if (productDescription) productDescription.innerText = book.description;
}

// Fetch related products based on categories
async function fetchRelatedProducts(categories) {
  const relatedContainer = document.getElementById("related-products");

  // Assuming you have an API endpoint to get related books by category
  const apiUrl = `https://glad-lion-holy.ngrok-free.app/api/books/categories?category=${categories.join(",")}&pageNumber=1&pageSize=5`;
  const headers = { "ngrok-skip-browser-warning": true };

  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch related products");
    }

    const data = await response.json();
    console.log("Fetched related products:", data);  // Log the API response
    renderRelatedProducts(data.data.items);
  } catch (error) {
    console.error("Error fetching related products:", error);
    relatedContainer.innerHTML = `<p>No related products found.</p>`;
  }
}

// Render related products to the DOM with custom book-card layout
function renderRelatedProducts(books) {
  const relatedContainer = document.getElementById("related-products");

  // Clear any existing content
  relatedContainer.innerHTML = "";

  if (books.length === 0) {
    relatedContainer.innerHTML = `<p>No related products found.</p>`;
    return;
  }

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
    relatedContainer.insertAdjacentHTML("beforeend", bookItem);
  });
}

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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const bookId = getBookId();
  if (bookId) {
    fetchBookDetails(bookId);
  } else {
    console.error("No bookId found in URL");
  }
});
