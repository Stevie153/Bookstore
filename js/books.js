// const featuredBooks = [
//     {
//       id: 5,
//       name: "Pride and Prejudice",
//       image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
//       description: "A novel by Jane Austen.",
//       price: "$ 8.99",
//       category: "Romance",
//       author: "Jane Austen",
//       createdAt: new Date("2024-05-01"),
//       updatedAt: new Date("2024-05-02"),
//     },
//     {
//       id: 6,
//       name: "The Catcher in the Rye",
//       image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
//       description: "A novel by J.D. Salinger.",
//       price: 11.99,
//       category: "Fiction",
//       author: "J.D. Salinger",
//       createdAt: new Date("2024-06-01"),
//       updatedAt: new Date("2024-06-02"),
//     },
//   ];

//   const arrivalBooks = [
//     {
//       id: 7,
//       name: "The Hobbit",
//       image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
//       description: "A novel by J.R.R. Tolkien.",
//       price: 13.99,
//       category: "Fantasy",
//       author: "J.R.R. Tolkien",
//       createdAt: new Date("2024-07-01"),
//       updatedAt: new Date("2024-07-02"),
//     },
//     {
//       id: 8,
//       name: "The Alchemist",
//       image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
//       description: "A novel by Paulo Coelho.",
//       price: 9.99,
//       category: "Adventure",
//       author: "Paulo Coelho",
//       createdAt: new Date("2024-08-01"),
//       updatedAt: new Date("2024-08-02"),
//     },
//     {
//       id: 9,
//       name: "The Alchemist",
//       image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
//       description: "A novel by Paulo Coelho.",
//       price: 9.99,
//       category: "Adventure",
//       author: "Paulo Coelho",
//       createdAt: new Date("2024-08-01"),
//       updatedAt: new Date("2024-08-02"),
//     },
//   ];

//   const addArrivals = (data) => {
//     const fragment = document.createDocumentFragment();

//     if (data.length > 0) {
//       data.map((item) => {
//         const divTag = document.createElement("div");
//         divTag.classList.add("book-card");
//         divTag.id = item.id;
//         const hTag = document.createElement("h3");
//         const pTag = document.createElement("p");
//         const imgTag = document.createElement("img");
//         const priceTag = document.createElement("p");
//         const categoryTag = document.createElement("p");
//         const author = document.createElement("p");
//         const createdAt = document.createElement("p");
//         const updatedAt = document.createElement("p");

//         // Add Contents to created elements
//         hTag.textContent = item.name;
//         pTag.textContent = item.description;
//         priceTag.textContent = item.price;
//         categoryTag.textContent = item.category;
//         author.textContent = item.author;
//         createdAt.textContent = item.createdAt;
//         updatedAt.textContent = item.updatedAt;
//         imgTag.src = item.image;

//         divTag.appendChild(imgTag);
//         divTag.appendChild(hTag);
//         divTag.appendChild(pTag);
//         divTag.appendChild(priceTag);
//         divTag.appendChild(categoryTag);
//         divTag.appendChild(author);
//         divTag.appendChild(createdAt);
//         divTag.appendChild(updatedAt);

//         fragment.appendChild(divTag);
//       });
//     }

//     return fragment;
//   };

//   document.addEventListener("DOMContentLoaded", function () {
//     // Variables

//     const header2 = document.querySelector(".header-2");

//     window.onscroll = () => {
//       if (window.scrollY > 80) {
//         header2.classList.add("active");
//       } else {
//         header2.classList.remove("active");
//       }
//     };

//     if (window.scrollY > 80) {
//       header2.classList.add("active");
//     }

//     const arrivalsContainer = document.getElementById("arrivalscontainer");
//     const featuredContainer = document.getElementById("featuredcontainer");

//     //console.log(arrivalsContainer);

//     arrivalsContainer.appendChild(addArrivals(arrivalBooks));
//     featuredContainer.appendChild(addArrivals(featuredBooks));
//   });

// const fetcher = async(url,method="GET",body)=>
//   {
//       const baseUrl = 'https://glad-lion-holy.ngrok-free.app/api'
//       try {
//           // Send POST request to the server
//           const response = await fetch(`${baseUrl}/${url}`, {
//               method: method,
//               headers: {
//                   'Content-Type': 'application/json',
//                   'ngrok-skip-browser-warnings': true

//               },
//               body: body? JSON.stringify(body):null
//           });

//           // Check for successful response
//           if (response.ok) {
//               const data = await response.json();

//               //alert(data.message);
//               return data.data;

//               // Redirect or perform further actions
//           } else {
//               const errorData = await response.json();
//               alert("Error: " + errorData.message);
//               throw errorData;

//           }
//       } catch (error) {
//           console.error('Error:', error);
//           alert("An error occurred. Please try again.");
//           throw error;
//       }
//   }

// // DOM Elements
// const addBookOverlay = document.getElementById("add-book-overlay");
// const closeOverlayBtn = document.getElementById("close-overlay-btn");
// const addBookBtn = document.getElementById("add-book-btn");
// const saveBookBtn = document.getElementById("save-book-btn");
// const bookTable = document.getElementById("book-table").getElementsByTagName("tbody")[0];

// // API endpoints
// const GET_BOOKS_ENDPOINT = "books/all"; // Endpoint for GET books
// const ADD_BOOK_ENDPOINT = "books/add-book"; // Endpoint for POST (add) a book

// // Check if the user is logged in and is an admin
// const checkAdminRole = () => {
//     const token = localStorage.getItem("authToken");
//     const userRole = localStorage.getItem("userRole");

//     if (!token || userRole !== "ADMIN") {
//         addBookBtn.style.display = "none"; // Hide Add Book button
//         const deleteButtons = document.querySelectorAll(".btn-danger");
//         deleteButtons.forEach(button => button.disabled = true); // Disable delete buttons
//     }
// };

// // Open Add Book Overlay
// addBookBtn.addEventListener("click", () => {
//     addBookOverlay.style.display = "flex";
// });

// // Close Add Book Overlay
// closeOverlayBtn.addEventListener("click", () => {
//     addBookOverlay.style.display = "none";
// });

// // Save Book Function
// saveBookBtn.addEventListener("click", async () => {
//     const title = document.getElementById("book-title").value;
//     const author = document.getElementById("book-author").value;
//     const description = document.getElementById("book-description").value;
//     const bookImgUrl = document.getElementById("book-img-url").value;
//     const filePath = document.getElementById("book-file-path").value;
//     const categories = document.getElementById("book-categories").value.split(',').map(cat => cat.trim());
//     const price = parseFloat(document.getElementById("book-price").value);

//     if (!title || !author || !description || !bookImgUrl || !filePath || categories.length === 0 || isNaN(price)) {
//         alert("Please fill in all fields correctly.");
//         return;
//     }

//     const newBook = {
//         title,
//         author,
//         description,
//         bookImgUrl,
//         filePath,
//         categories,
//         price,
//     };

//     try {
//         const response = await fetcher(ADD_BOOK_ENDPOINT, "POST", newBook);
//         alert("Book added successfully.");
//         renderBookTable(); // Re-render the book table to show the newly added book
//         addBookOverlay.style.display = "none"; // Close the overlay
//     } catch (error) {
//         console.error("Error adding book:", error);
//     }
// });

// // Fetch and render the books from the backend API (GET request)
// async function renderBookTable() {
//     try {
//         const data = await fetcher(GET_BOOKS_ENDPOINT, "GET");

//         if (!data || !data.items) {
//             alert("Failed to fetch books or no data available.");
//             return;
//         }

//         const books = data.items; // Access the `items` array from the response

//         bookTable.innerHTML = ''; // Clear current book entries

//         if (books.length === 0) {
//             bookTable.innerHTML = `<tr><td colspan="6">No books available.</td></tr>`;
//             return;
//         }

//         books.forEach((book) => {
//             const row = bookTable.insertRow();
//             row.innerHTML = `
//                 <td>${book.id}</td>
//                 <td>${book.title}</td>
//                 <td>${book.author}</td>
//                 <td>${book.description}</td>
//                 <td>$${book.price.toFixed(2)}</td>
//                 <td>
//                     <button class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete</button>
//                 </td>
//             `;
//         });
//     } catch (error) {
//         console.error("Error fetching books:", error);
//         alert("An error occurred while fetching books.");
//     }
// }

// // Delete book function
// async function deleteBook(bookId) {
//     if (confirm("Are you sure you want to delete this book?")) {
//         try {
//             const response = await fetcher(`books/${bookId}`, "DELETE");

//             if (response) {
//                 alert("Book deleted successfully.");
//                 renderBookTable(); // Re-render the table after deletion
//             }
//         } catch (error) {
//             console.error("Error deleting book:", error);
//         }
//     }
// }

// // Initial render of the book table
// renderBookTable();

// // Check if the user is an admin
// checkAdminRole();

// Fetch and render books data
async function fetchBooks() {
  const apiUrl =
    "https://glad-lion-holy.ngrok-free.app/api/books/all?pageNumber=2&pageSize=4";
  const headers = {
    "ngrok-skip-browser-warning": true,
  };

  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Books Data:", data);

    const books = data.data.items; // Assuming books are in `data.data.items`
    localStorage.setItem("books", JSON.stringify(books)); // Save to localStorage
    renderBooks(books); // Render books on the page
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Render books into the DOM
function renderBooks(books) {
  const container = document.getElementById("featuredcontainer");
  container.innerHTML = ""; // Clear container before adding new content

  books.forEach((book) => {
    const bookCard = `
      <div class="book-card">
        <div class="book-card-opt">
          <img src="${book.bookImgUrl}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p class="long-text">${book.author}</p>
          <p>${book.categories}</p>
          <p>Price: $${book.price}</p>
        </div>
        <div class="book-card-options">
          <button class="btn" onclick="navigateToBook('${book.id}')"> 
            <i class="fas fa-info-circle"></i> View Details 
          </button> 
          <button class="btn" onclick="addToCart('${book.id}')"> 
            <i class="fas fa-shopping-cart"></i> Add to Cart 
          </button> 
          <button class="btn" onclick="addToWishlist('${book.id}')"> 
            <i class="fas fa-heart"></i> Add to Wishlist 
          </button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", bookCard);
  });

  // Shorten long text for author details
  const paragraphs = document.getElementsByClassName("long-text");
  Array.from(paragraphs).forEach((para) => {
    let text = para.innerHTML;
    let words = text.split(" ");
    if (words.length > 10) {
      para.innerHTML = words.slice(0, 30).join(" ") + " ...";
    }
  });
}

// Navigate to book details page
function navigateToBook(bookId) {
  console.log("Navigating to book ID:", bookId);
  // Navigate to the book details page with the bookId as a query parameter
  window.location.href = `/pages/product.html?bookId=${bookId}`;
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});
