document.getElementById('sort-dropdown').addEventListener('change', function (event) {
    const sortType = event.target.value;

    // Add sorting logic here, such as rearranging book data based on price
    if (sortType === 'price-low-to-high') {
        alert('Sorting by price: Low to High');
    } else if (sortType === 'price-high-to-low') {
        alert('Sorting by price: High to Low');
    } else {
        alert('Default Sorting');
    }
});
