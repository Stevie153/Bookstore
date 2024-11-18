const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  let timeoutId;

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');

    // Clear any previous timeouts
    clearTimeout(timeoutId);

    // Set a timeout to close the menu after 3 seconds
    if (menu.classList.contains('menu-open')) {
      timeoutId = setTimeout(() => {
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
      }, 5000); // 3000 milliseconds = 3 seconds
    }
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');

      options.forEach(option => {
        option.classList.remove('active');
      });
      option.classList.add('active');
    });
  });
});


 
  let slideIndex = 0;
  showSlides();
  
  function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 10000); 
  }
  
  function changeSlide(n) {
    slideIndex += n;
    showSlides();
  }

  