// Select elements
const loginBtn = document.querySelector("#login-btn");
const closeLoginBtn = document.querySelector("#close-login-btn");
const closeSignupBtn = document.querySelector("#close-signup-btn");
const showSignUp = document.getElementById("show__signup");
const showSignIn = document.getElementById("show__signin");

const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");

// Show login form
loginBtn.onclick = () => {
  loginContainer.classList.add("login__form__active");
  signupContainer.classList.remove("login__form__active");
  signupContainer.classList.add("hidden");
};

// Close login form
closeLoginBtn.onclick = () => {
  loginContainer.classList.remove("login__form__active");
};

// Show signup form and hide login form
showSignUp.onclick = (event) => {
  event.preventDefault();
  loginContainer.classList.remove("login__form__active");
  signupContainer.classList.add("login__form__active");
  signupContainer.classList.remove("hidden");
};

// Close signup form
closeSignupBtn.onclick = () => {
  signupContainer.classList.remove("login__form__active");
  signupContainer.classList.add("hidden");
};

// Show login form from signup form
showSignIn.onclick = (event) => {
  event.preventDefault();
  signupContainer.classList.remove("login__form__active");
  signupContainer.classList.add("hidden");
  loginContainer.classList.add("login__form__active");
};