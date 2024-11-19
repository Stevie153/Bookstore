document.addEventListener("DOMContentLoaded", () => {
  const userRole = localStorage.getItem("userRole");

  // Redirect non-admin users
  if (userRole !== "ADMIN") {
    alert("Access Denied: Only admins can access this page.");
    window.location.href = "/index.html";
    return;
  }

  // Initialize Dashboard
  initializeDashboard();
});

let currentCatId = null; // Track the current category ID for editing

// Initialize Dashboard
function initializeDashboard() {
  const addCategoryOverlay = document.getElementById("add-category-overlay");
  const closeOverlayBtn = document.getElementById("close-overlay-btn");
  const addCatBtn = document.getElementById("add-category-btn");
  const saveCatBtn = document.getElementById("save-category-btn");
  const catTable = document.getElementById("categories-table").getElementsByTagName("tbody")[0];

  // Event listeners
  addCatBtn.addEventListener("click", () => {
    currentCatId = null; // Reset current category ID
    clearForm();
    document.getElementById("form-title").innerText = "Add New Category";
    addCategoryOverlay.style.display = "flex";
  });

  closeOverlayBtn.addEventListener("click", () => {
    addCategoryOverlay.style.display = "none";
  });

  saveCatBtn.addEventListener("click", async () => {
    const category = getFormData();
    if (validateCategory(category)) {
      if (currentCatId) {
        await updateCategory(currentCatId, category);
      } else {
        await addCategory(category);
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  });

  loadCategory(catTable);
}

// Clear form fields
function clearForm() {
  document.getElementById("category-title").value = "";
}

// Get form data
function getFormData() {
  return {
    categoryName: document.getElementById("category-title").value.trim(),
  };
}

// Validate form data
function validateCategory(category) {
  return category.categoryName !== "";
}

// Load categories into the table
async function loadCategory(catTable) {
  try {
    const response = await fetch("https://glad-lion-holy.ngrok-free.app/api/categories/all?pageNumber=1&pageSize=10", {
      headers: { "ngrok-skip-browser-warning": true },
    });

    if (!response.ok) throw new Error("Failed to fetch categories");

    const data = await response.json();

    // Clear the table before adding new rows
    catTable.innerHTML = "";

    data.data.items.forEach((cat, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${cat}</td>

          <td>
          <div class="btn-container">
            <button class="btn btn-primary" onclick="editCategory(${index})">Edit</button>
            <button class="btn btn-danger" onclick="deleteCategory(${index})">Delete</button>
          </div></td>
        </tr>`;
      catTable.insertAdjacentHTML("beforeend", row);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

// Add a new category
async function addCategory(category) {
  const userToken = localStorage.getItem("authToken");

  try {
    const response = await fetch("https://glad-lion-holy.ngrok-free.app/api/categories/add-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) throw new Error("Failed to add category");

    alert("Category added successfully!");
    location.reload();
  } catch (error) {
    console.error("Error adding category:", error);
  }
}

// Edit an existing category
function editCategory(catId) {
  currentCatId = catId;

  fetch(`https://glad-lion-holy.ngrok-free.app/api/categories/${catId}`, {
    headers: { "ngrok-skip-browser-warning": true },
  })
    .then((response) => response.json())
    .then((data) => {
      const category = data.data;

      // Populate the form with the category data
      document.getElementById("category-title").value = category.title;

      // Change the overlay title
      document.getElementById("form-title").innerText = "Edit Category";

      // Show the overlay
      document.getElementById("add-category-overlay").style.display = "flex";
    })
    .catch((error) => console.error("Error fetching category details:", error));
}

// Update an existing category
async function updateCategory(catId, category) {
  const userToken = localStorage.getItem("authToken");

  try {
    const response = await fetch(`https://glad-lion-holy.ngrok-free.app/api/categories/${catId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) throw new Error("Failed to update category");

    alert("Category updated successfully!");
    location.reload();
  } catch (error) {
    console.error("Error updating category:", error);
  }
}

// Delete a category (optional: implement deleteCategory logic)
function deleteCategory(catId) {
  if (confirm("Are you sure you want to delete this category?")) {
    // Add delete logic here
    console.log(`Category ${catId} deleted!`);
  }
}
