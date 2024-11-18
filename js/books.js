
const featuredBooks = [
    {
      id: 5,
      name: "Pride and Prejudice",
      image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
      description: "A novel by Jane Austen.",
      price: "$ 8.99",
      category: "Romance",
      author: "Jane Austen",
      createdAt: new Date("2024-05-01"),
      updatedAt: new Date("2024-05-02"),
    },
    {
      id: 6,
      name: "The Catcher in the Rye",
      image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
      description: "A novel by J.D. Salinger.",
      price: 11.99,
      category: "Fiction",
      author: "J.D. Salinger",
      createdAt: new Date("2024-06-01"),
      updatedAt: new Date("2024-06-02"),
    },
  ];
  
  const arrivalBooks = [
    {
      id: 7,
      name: "The Hobbit",
      image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
      description: "A novel by J.R.R. Tolkien.",
      price: 13.99,
      category: "Fantasy",
      author: "J.R.R. Tolkien",
      createdAt: new Date("2024-07-01"),
      updatedAt: new Date("2024-07-02"),
    },
    {
      id: 8,
      name: "The Alchemist",
      image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
      description: "A novel by Paulo Coelho.",
      price: 9.99,
      category: "Adventure",
      author: "Paulo Coelho",
      createdAt: new Date("2024-08-01"),
      updatedAt: new Date("2024-08-02"),
    },
    {
      id: 9,
      name: "The Alchemist",
      image: "/Assets/images/valentin-antonini-0eTLk6dA_Ds-unsplash.jpg",
      description: "A novel by Paulo Coelho.",
      price: 9.99,
      category: "Adventure",
      author: "Paulo Coelho",
      createdAt: new Date("2024-08-01"),
      updatedAt: new Date("2024-08-02"),
    },
  ];
  
  const addArrivals = (data) => {
    const fragment = document.createDocumentFragment();
  
    if (data.length > 0) {
      data.map((item) => {
        const divTag = document.createElement("div");
        divTag.classList.add("book-card");
        divTag.id = item.id;
        const hTag = document.createElement("h3");
        const pTag = document.createElement("p");
        const imgTag = document.createElement("img");
        const priceTag = document.createElement("p");
        const categoryTag = document.createElement("p");
        const author = document.createElement("p");
        const createdAt = document.createElement("p");
        const updatedAt = document.createElement("p");
  
        // Add Contents to created elements
        hTag.textContent = item.name;
        pTag.textContent = item.description;
        priceTag.textContent = item.price;
        categoryTag.textContent = item.category;
        author.textContent = item.author;
        createdAt.textContent = item.createdAt;
        updatedAt.textContent = item.updatedAt;
        imgTag.src = item.image;
  
        divTag.appendChild(imgTag);
        divTag.appendChild(hTag);
        divTag.appendChild(pTag);
        divTag.appendChild(priceTag);
        divTag.appendChild(categoryTag);
        divTag.appendChild(author);
        divTag.appendChild(createdAt);
        divTag.appendChild(updatedAt);
  
        fragment.appendChild(divTag);
      });
    }
  
    return fragment;
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    // Variables
    
    const header2 = document.querySelector(".header-2");
   
  
  
    window.onscroll = () => {
      if (window.scrollY > 80) {
        header2.classList.add("active");
      } else {
        header2.classList.remove("active");
      }
    };
  
    
    if (window.scrollY > 80) {
      header2.classList.add("active");
    }
  
   
  
    const arrivalsContainer = document.getElementById("arrivalscontainer");
    const featuredContainer = document.getElementById("featuredcontainer");
  
    //console.log(arrivalsContainer);
  
    arrivalsContainer.appendChild(addArrivals(arrivalBooks));
    featuredContainer.appendChild(addArrivals(featuredBooks));
  });
  