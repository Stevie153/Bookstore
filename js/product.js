// Extract `bookId` from the URL query parameters
function getBookId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("bookId");
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
      renderBookDetails(data.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
      document.querySelector(".product-details").innerHTML = `
        <p>Sorry, we couldn't load the book details. Please try again later.</p>`;
    }
  }
  
  // Render book details to the DOM
  function renderBookDetails(book) {
    document.getElementById("breadcrumb-title").innerText = book.title;
    document.getElementById("product-image").src = book.bookImgUrl;
    document.getElementById("product-title").innerText = book.title;
    document.getElementById("product-author").innerText = book.author;
    document.getElementById("product-categories").innerText = book.categories.join(", ");
    document.getElementById("product-price").innerText = `$${book.price.toFixed(2)}`;
    document.getElementById("product-description").innerText = book.description;
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
  