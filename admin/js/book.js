document.addEventListener("DOMContentLoaded", () => {
  const userRole = localStorage.getItem("userRole");

  // Redirect non-admin users
  if (userRole !== "ADMIN") {
    alert("Access Denied: Only admins can access this page.");
    window.location.href = "/index.html"; // Redirect to homepage or login
    return;
  }

  // Initialize Dashboard
  initializeDashboard();
});

let currentBookId = null; // Track the current book ID for editing

// Initialize Dashboard
async function initializeDashboard() {
  const addBookBtn = document.getElementById("add-book-btn");
  const addBookOverlay = document.getElementById("add-book-overlay");
  const closeOverlayBtn = document.getElementById("close-overlay-btn");
  const saveBookBtn = document.getElementById("save-book-btn");
  const bookTable = document.getElementById("book-table").querySelector("tbody");

  // Event listeners
  addBookBtn.addEventListener("click", () => {
    currentBookId = null; // Reset current book ID
    clearForm();
    document.getElementById("form-title").innerText = "Add New Book";
    addBookOverlay.style.display = "flex";
  });

  closeOverlayBtn.addEventListener("click", () => {
    addBookOverlay.style.display = "none";
  });

  saveBookBtn.addEventListener("click", async () => {
    const book = getFormData();
    if (validateBook(book)) {
      if (currentBookId) {
        await updateBook(currentBookId, book);
      } else {
        await addBook(book);
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  });

  // Fetch books and categories
  loadBooks(bookTable);
  await loadCategories(); // Fetch and populate categories dropdown
}

// Function to fetch categories and populate the dropdown
async function loadCategories() {
  const categorySelect = document.getElementById("book-categories");
  
  try {
    const response = await fetch("https://glad-lion-holy.ngrok-free.app/api/categories/all?pageNumber=1&pageSize=100", {
      headers: { "ngrok-skip-browser-warning": true },
    });

    if (!response.ok) throw new Error("Failed to fetch categories");

    const data = await response.json();
    const categories = data.data.items;

    // Clear any existing options before adding new ones
    categorySelect.innerHTML = '<option value="">Select Category</option>';

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;  // category ID is stored as the value
      option.textContent = category;  // category title is shown to the user
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    alert("Error fetching categories. Please try again later.");
  }
}

// Clear the form fields
function clearForm() {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-description").value = "";
  document.getElementById("book-img-url").value = "";
  document.getElementById("book-file-path").value = "";
  document.getElementById("book-categories").value = "";  // Reset the category dropdown
  document.getElementById("book-price").value = "";
}

// Get form data (including the selected category)
function getFormData() {
  return {
    title: document.getElementById("book-title").value.trim(),
    author: document.getElementById("book-author").value.trim(),
    description: document.getElementById("book-description").value.trim(),
    bookImgUrl: document.getElementById("book-img-url").value.trim(),
    bookfilePath: document.getElementById("book-file-path").value.trim(),
    categoryName: [document.getElementById("book-categories").value.trim()], // Use the selected category ID
    price: parseFloat(document.getElementById("book-price").value.trim()),
  };
}

// Load books into the table (book display)
async function loadBooks(bookTable) {
  try {
    const response = await fetch("https://glad-lion-holy.ngrok-free.app/api/books/all?pageNumber=1&pageSize=100", {
      headers: { "ngrok-skip-browser-warning": true },
    });

    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    data.data.items.forEach((book) => {
      const row = `
        <tr>
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>$${book.price.toFixed(2)}</td>
          <td><img src="${book.bookImgUrl}" alt="${book.title}" width="50"></td>
          <td> <a href="${book.bookFilePath}">${book.title}</a> </td>
          <td>
            <button class="btn btn-primary" onclick="editBook(${book.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
          </td>
        </tr>`;
      bookTable.insertAdjacentHTML("beforeend", row);
    });
  } catch (error) {
    console.error("Error loading books:", error);
  }
}

// Add a new book
async function addBook(book) {
  const userToken = localStorage.getItem("authToken");

  try {
    const response = await fetch("https://glad-lion-holy.ngrok-free.app/api/books/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error("Failed to add book");

    alert("Book added successfully!");
    location.reload();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

// Update an existing book
async function updateBook(bookId, book) {
  const userToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`https://glad-lion-holy.ngrok-free.app/api/books/update-book/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error("Failed to update book");

    alert("Book updated successfully!");
    location.reload();
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

// Validate book form
function validateBook(book) {
  return (
    book.title &&
    book.author &&
    book.description &&
    book.bookImgUrl &&
    book.filePath &&
    book.categoryName.length > 0 &&
    !isNaN(book.price) &&
    book.price >= 0
  );
}

// Edit an existing book
function editBook(bookId) {
  currentBookId = bookId;

  fetch(`https://glad-lion-holy.ngrok-free.app/api/books/${bookId}`, {
    headers: { "ngrok-skip-browser-warning": true },
  })
    .then((response) => response.json())
    .then((data) => {
      const book = data.data;

      // Populate the form with the book data
      document.getElementById("book-title").value = book.title;
      document.getElementById("book-author").value = book.author;
      document.getElementById("book-description").value = book.description;
      document.getElementById("book-img-url").value = book.bookImgUrl;
      document.getElementById("book-file-path").value = book.filePath;
      document.getElementById("book-categories").value = book.categories.join(", "); // Pre-select the categories
      document.getElementById("book-price").value = book.price;

      // Change the overlay title
      document.getElementById("form-title").innerText = "Edit Book";

      // Show the overlay
      document.getElementById("add-book-overlay").style.display = "flex";
    })
    .catch((error) => console.error("Error fetching book details:", error));
}
